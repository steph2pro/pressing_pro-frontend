import { useState } from 'react';
import ExpenseApi from '../../../data/datasources/ExpenseApi';
import { useQueryClient } from '@tanstack/react-query';
import { deleteExpenseUseCase } from '../../../domain/usecases/expensives/deleteExpenseUseCase';

export const useDeleteExpense = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const expenseApi = new ExpenseApi();
  const queryClient = useQueryClient();

  const deleteExpense = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      await deleteExpenseUseCase(id, expenseApi);
      setSuccess(true);
      
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['expensesStats'] });
      
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la suppression de la dépense');
      console.error('Erreur lors de la suppression :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteExpense,
    loading,
    error,
    success,
  };
};