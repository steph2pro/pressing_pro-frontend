import { Depense, CreateDepenseRequest } from '../../../data/models/expenses';
import ExpenseApi from '../../../data/datasources/ExpenseApi';
import toast from 'react-hot-toast';

export const createExpenseUseCase = async (
  payload: CreateDepenseRequest,
  expenseApi: ExpenseApi
): Promise<Depense> => {
  try {
    const response = await expenseApi.createExpense(payload);
    toast.success('✅ Dépense créée avec succès !');
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la création de la dépense :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};