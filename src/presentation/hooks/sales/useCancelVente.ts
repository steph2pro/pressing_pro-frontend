import { useState } from 'react';
import { Vente } from '../../../data/models/sales';
import SalesApi from '../../../data/datasources/SalesApi';
import { useQueryClient } from '@tanstack/react-query';
import { cancelSaleUseCase } from '../../../domain/usecases/sales/cancelSaleUseCase';

export const useCancelVente = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const salesApi = new SalesApi();
  const queryClient = useQueryClient();

  const cancelVente = async (id: number): Promise<Vente | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await cancelSaleUseCase(id, salesApi);
      setSuccess(true);
      
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['ventes'] });
      queryClient.invalidateQueries({ queryKey: ['vente', id] });
      queryClient.invalidateQueries({ queryKey: ['vente-stats'] });
      
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'annulation de la vente');
      console.error('Erreur lors de l\'annulation :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    cancelVente,
    loading,
    error,
    success,
  };
};