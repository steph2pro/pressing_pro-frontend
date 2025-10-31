import { useState } from 'react';
import { Vente, CreateVenteRequest } from '../../../data/models/sales';
import SalesApi from '../../../data/datasources/SalesApi';
import { useQueryClient } from '@tanstack/react-query';
import { createSaleUseCase } from '../../../domain/usecases/sales/createSaleUseCase';

export const useCreateVente = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const salesApi = new SalesApi();
  const queryClient = useQueryClient();

  const createVente = async (venteData: CreateVenteRequest): Promise<Vente | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await createSaleUseCase(venteData, salesApi);
      setSuccess(true);
      
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['ventes'] });
      queryClient.invalidateQueries({ queryKey: ['vente-stats'] });
      
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création de la vente');
      console.error('Erreur lors de la création :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    createVente,
    loading,
    error,
    success,
  };
};