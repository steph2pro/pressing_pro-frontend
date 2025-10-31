import { useState } from 'react';
import { Depense, ValidationDepenseRequest } from '../../../data/models/expenses';
import ExpenseApi from '../../../data/datasources/ExpenseApi';
import { useQueryClient } from '@tanstack/react-query';
import { validateExpenseUseCase } from '../../../domain/usecases/expensives/validateExpenseUseCase';

export const useValidateExpense = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const expenseApi = new ExpenseApi();
  const queryClient = useQueryClient();

  const validateExpense = async (id: number, payload: ValidationDepenseRequest): Promise<Depense | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await validateExpenseUseCase(id, payload, expenseApi);
      setSuccess(true);
      
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['expense', id] });
      queryClient.invalidateQueries({ queryKey: ['expensesStats'] });
      
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la validation de la dépense');
      console.error('Erreur lors de la validation :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    validateExpense,
    loading,
    error,
    success,
  };
};