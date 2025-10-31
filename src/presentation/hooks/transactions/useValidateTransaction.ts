import { useState } from 'react';
import { Transaction, ValidationTransactionRequest } from '../../../data/models/transactions';
import { validateTransactionUseCase } from '../../../domain/usecases/transactions/validateTransactionUseCase';
import TransactionApi from '../../../data/datasources/TransactionApi';
import { useQueryClient } from '@tanstack/react-query';

export const useValidateTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const transactionApi = new TransactionApi();
  const queryClient = useQueryClient();

  const validateTransaction = async (
    id: number, 
    validationData: ValidationTransactionRequest
  ): Promise<Transaction | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await validateTransactionUseCase(id, validationData, transactionApi);
      setSuccess(true);
      
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transaction', id] });
      queryClient.invalidateQueries({ queryKey: ['balance'] });
      queryClient.invalidateQueries({ queryKey: ['mouvements-tresorerie'] });
      
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la validation de la transaction');
      console.error('Erreur lors de la validation :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    validateTransaction,
    loading,
    error,
    success,
  };
};