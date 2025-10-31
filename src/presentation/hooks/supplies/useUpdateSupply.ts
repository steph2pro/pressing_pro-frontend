import { useState } from 'react';
import { Approvisionnement, UpdateApprovisionnementRequest } from '../../../data/models/supplies';
import { updateSupplyUseCase } from '../../../domain/usecases/supplies';
import SupplyApi from '../../../data/datasources/SupplyApi';
import { useQueryClient } from '@tanstack/react-query';

export const useUpdateSupply = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const supplyApi = new SupplyApi();
  const queryClient = useQueryClient();

  const updateSupply = async (id: number, supplyData: UpdateApprovisionnementRequest): Promise<Approvisionnement | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await updateSupplyUseCase(id, supplyData, supplyApi);
      setSuccess(true);
      
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['supplies'] });
      queryClient.invalidateQueries({ queryKey: ['supply', id] });
      
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la modification de l\'approvisionnement');
      console.error('Erreur lors de la modification :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    updateSupply,
    loading,
    error,
    success,
  };
};