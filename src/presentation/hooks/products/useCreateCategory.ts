import { useState } from 'react';
import { Categorie, CreateCategorieRequest } from '../../../data/models/products';
import ProductApi from '../../../data/datasources/ProductApi';
import { useQueryClient } from '@tanstack/react-query';
import { createCategoryUseCase } from '../../../domain/usecases/products';

export const useCreateCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const productApi = new ProductApi();
  const queryClient = useQueryClient();

  const createCategory = async (payload: CreateCategorieRequest): Promise<Categorie | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await createCategoryUseCase(payload, productApi);
      setSuccess(true);
      
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création de la catégorie');
      console.error('Erreur lors de la création :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    createCategory,
    loading,
    error,
    success,
  };
};