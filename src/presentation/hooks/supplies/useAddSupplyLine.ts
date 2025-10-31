import { useState } from 'react';
import { LigneApprovisionnement, AddLigneApprovisionnementRequest } from '../../../data/models/supplies';
import { addSupplyLineUseCase } from '../../../domain/usecases/supplies';
import SupplyApi from '../../../data/datasources/SupplyApi';
import { useQueryClient } from '@tanstack/react-query';

export const useAddSupplyLine = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const supplyApi = new SupplyApi();
  const queryClient = useQueryClient();

  const addSupplyLine = async (lineData: AddLigneApprovisionnementRequest): Promise<LigneApprovisionnement | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await addSupplyLineUseCase(lineData, supplyApi);
      setSuccess(true);
      
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['supply', lineData.approvisionnementId] });
      queryClient.invalidateQueries({ queryKey: ['supplies'] });
      
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'ajout de la ligne');
      console.error('Erreur lors de l\'ajout :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    addSupplyLine,
    loading,
    error,
    success,
  };
};