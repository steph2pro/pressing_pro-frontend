import { useState } from 'react';
import { Facture, CreateFactureRequest } from '../../../data/models/sales';
import { createFactureUseCase } from '../../../domain/usecases/sales/createFactureUseCase';
import SalesApi from '../../../data/datasources/SalesApi';
import { useQueryClient } from '@tanstack/react-query';

export const useCreateFacture = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const salesApi = new SalesApi();
  const queryClient = useQueryClient();

  const createFacture = async (factureData: CreateFactureRequest): Promise<Facture | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await createFactureUseCase(factureData, salesApi);
      setSuccess(true);
      
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['factures'] });
      queryClient.invalidateQueries({ queryKey: ['vente', factureData.venteId] });
      
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création de la facture');
      console.error('Erreur lors de la création :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    createFacture,
    loading,
    error,
    success,
  };
};