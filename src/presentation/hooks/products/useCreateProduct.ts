import { useState } from 'react';
import { Produit, CreateProduitRequest } from '../../../data/models/products';
import ProductApi from '../../../data/datasources/ProductApi';
import { useQueryClient } from '@tanstack/react-query';
import { createProductUseCase } from '../../../domain/usecases/products';

export const useCreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const productApi = new ProductApi();
  const queryClient = useQueryClient();

  const createProduct = async (payload: CreateProduitRequest): Promise<Produit | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await createProductUseCase(payload, productApi);
      setSuccess(true);
      
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['products'] });
      
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création du produit');
      console.error('Erreur lors de la création :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    createProduct,
    loading,
    error,
    success,
  };
};