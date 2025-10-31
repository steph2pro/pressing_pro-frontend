import { Depense, ValidationDepenseRequest } from '../../../data/models/expenses';
import ExpenseApi from '../../../data/datasources/ExpenseApi';
import toast from 'react-hot-toast';

export const validateExpenseUseCase = async (
  id: number,
  payload: ValidationDepenseRequest,
  expenseApi: ExpenseApi
): Promise<Depense> => {
  try {
    const response = await expenseApi.validateExpense(id, payload);
    
    if (payload.statut === 'validated') {
      toast.success('✅ Dépense validée avec succès !');
    } else if (payload.statut === 'rejected') {
      toast.success('✅ Dépense rejetée avec succès !');
    }
    
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la validation de la dépense :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};