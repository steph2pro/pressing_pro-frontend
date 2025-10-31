import { useState } from 'react';
import { Vente, UpdateVenteRequest } from '../../../data/models/sales';
import SalesApi from '../../../data/datasources/SalesApi';
import { useQueryClient } from '@tanstack/react-query';
import { updateSaleUseCase } from '../../../domain/usecases/sales/updateSaleUseCase';

export const useUpdateVente = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const salesApi = new SalesApi();
  const queryClient = useQueryClient();

  const updateVente = async (id: number, venteData: UpdateVenteRequest): Promise<Vente | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await updateSaleUseCase(id, venteData, salesApi);
      setSuccess(true);
      
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['ventes'] });
      queryClient.invalidateQueries({ queryKey: ['vente', id] });
      queryClient.invalidateQueries({ queryKey: ['vente-stats'] });
      
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la modification de la vente');
      console.error('Erreur lors de la modification :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    updateVente,
    loading,
    error,
    success,
  };
};