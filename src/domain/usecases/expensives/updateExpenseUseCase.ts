import { Depense, UpdateDepenseRequest } from '../../../data/models/expenses';
import ExpenseApi from '../../../data/datasources/ExpenseApi';
import toast from 'react-hot-toast';

export const updateExpenseUseCase = async (
  id: number,
  payload: UpdateDepenseRequest,
  expenseApi: ExpenseApi
): Promise<Depense> => {
  try {
    const response = await expenseApi.updateExpense(id, payload);
    toast.success('✅ Dépense modifiée avec succès !');
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la modification de la dépense :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};