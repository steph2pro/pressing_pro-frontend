import { useState } from 'react';
import ProductApi from '../../../data/datasources/ProductApi';
import { useQueryClient } from '@tanstack/react-query';
import { deleteCategoryUseCase } from '../../../domain/usecases/products';

export const useDeleteCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const productApi = new ProductApi();
  const queryClient = useQueryClient();

  const deleteCategory = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      await deleteCategoryUseCase(id, productApi);
      setSuccess(true);
      
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la suppression de la catégorie');
      console.error('Erreur lors de la suppression :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteCategory,
    loading,
    error,
    success,
  };
};