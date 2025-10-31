import { useState } from 'react';
import { Transaction, CreateTransactionRequest } from '../../../data/models/transactions';
import { createTransactionUseCase } from '../../../domain/usecases/transactions/createTransactionUseCase';
import TransactionApi from '../../../data/datasources/TransactionApi';
import { useQueryClient } from '@tanstack/react-query';

export const useCreateTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const transactionApi = new TransactionApi();
  const queryClient = useQueryClient();

  const createTransaction = async (transactionData: CreateTransactionRequest): Promise<Transaction | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await createTransactionUseCase(transactionData, transactionApi);
      setSuccess(true);
      
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['balance'] });
      queryClient.invalidateQueries({ queryKey: ['mouvements-tresorerie'] });
      
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création de la transaction');
      console.error('Erreur lors de la création :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    createTransaction,
    loading,
    error,
    success,
  };
};