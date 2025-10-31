import { useState } from 'react';
import { Categorie, UpdateCategorieRequest } from '../../../data/models/products';
import ProductApi from '../../../data/datasources/ProductApi';
import { useQueryClient } from '@tanstack/react-query';
import { updateCategoryUseCase } from '../../../domain/usecases/products';

export const useUpdateCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const productApi = new ProductApi();
  const queryClient = useQueryClient();

  const updateCategory = async (id: number, payload: UpdateCategorieRequest): Promise<Categorie | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await updateCategoryUseCase(id, payload, productApi);
      setSuccess(true);
      
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la modification de la catégorie');
      console.error('Erreur lors de la modification :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    updateCategory,
    loading,
    error,
    success,
  };
};