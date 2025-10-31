import { useState } from 'react';
import { Approvisionnement, CreateApprovisionnementRequest } from '../../../data/models/supplies';
import { createSupplyUseCase } from '../../../domain/usecases/supplies';
import SupplyApi from '../../../data/datasources/SupplyApi';
import { useQueryClient } from '@tanstack/react-query';

export const useCreateSupply = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const supplyApi = new SupplyApi();
  const queryClient = useQueryClient();

  const createSupply = async (supplyData: CreateApprovisionnementRequest): Promise<Approvisionnement | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await createSupplyUseCase(supplyData, supplyApi);
      setSuccess(true);
      
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['supplies'] });
      
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création de l\'approvisionnement');
      console.error('Erreur lors de la création :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    createSupply,
    loading,
    error,
    success,
  };
};