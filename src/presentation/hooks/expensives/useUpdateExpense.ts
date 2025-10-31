import { useState } from 'react';
import { Depense, UpdateDepenseRequest } from '../../../data/models/expenses';
import ExpenseApi from '../../../data/datasources/ExpenseApi';
import { useQueryClient } from '@tanstack/react-query';
import { updateExpenseUseCase } from '../../../domain/usecases/expensives/updateExpenseUseCase';

export const useUpdateExpense = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const expenseApi = new ExpenseApi();
  const queryClient = useQueryClient();

  const updateExpense = async (id: number, payload: UpdateDepenseRequest): Promise<Depense | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await updateExpenseUseCase(id, payload, expenseApi);
      setSuccess(true);
      
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['expense', id] });
      queryClient.invalidateQueries({ queryKey: ['expensesStats'] });
      
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la modification de la dépense');
      console.error('Erreur lors de la modification :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    updateExpense,
    loading,
    error,
    success,
  };
};