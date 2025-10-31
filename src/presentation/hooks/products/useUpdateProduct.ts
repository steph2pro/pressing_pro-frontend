import { useState } from 'react';
import { Produit, UpdateProduitRequest } from '../../../data/models/products';
import ProductApi from '../../../data/datasources/ProductApi';
import { useQueryClient } from '@tanstack/react-query';
import { updateProductUseCase } from '../../../domain/usecases/products';

export const useUpdateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const productApi = new ProductApi();
  const queryClient = useQueryClient();

  const updateProduct = async (id: number, payload: UpdateProduitRequest): Promise<Produit | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await updateProductUseCase(id, payload, productApi);
      setSuccess(true);
      
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', id] });
      
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la modification du produit');
      console.error('Erreur lors de la modification :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProduct,
    loading,
    error,
    success,
  };
};