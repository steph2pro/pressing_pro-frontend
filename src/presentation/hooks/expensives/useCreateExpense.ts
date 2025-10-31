import { useState } from 'react';
import { Depense, CreateDepenseRequest } from '../../../data/models/expenses';
import ExpenseApi from '../../../data/datasources/ExpenseApi';
import { useQueryClient } from '@tanstack/react-query';
import { createExpenseUseCase } from '../../../domain/usecases/expensives/createExpenseUseCase';

export const useCreateExpense = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const expenseApi = new ExpenseApi();
  const queryClient = useQueryClient();

  const createExpense = async (payload: CreateDepenseRequest): Promise<Depense | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await createExpenseUseCase(payload, expenseApi);
      setSuccess(true);
      
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['expensesStats'] });
      
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création de la dépense');
      console.error('Erreur lors de la création :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    createExpense,
    loading,
    error,
    success,
  };
};