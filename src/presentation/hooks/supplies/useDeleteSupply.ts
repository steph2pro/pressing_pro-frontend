import { useState } from 'react';
import { deleteSupplyUseCase } from '../../../domain/usecases/supplies';
import SupplyApi from '../../../data/datasources/SupplyApi';
import { useQueryClient } from '@tanstack/react-query';

export const useDeleteSupply = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const supplyApi = new SupplyApi();
  const queryClient = useQueryClient();

  const deleteSupply = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      await deleteSupplyUseCase(id, supplyApi);
      setSuccess(true);
      
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['supplies'] });
      
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la suppression de l\'approvisionnement');
      console.error('Erreur lors de la suppression :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteSupply,
    loading,
    error,
    success,
  };
};