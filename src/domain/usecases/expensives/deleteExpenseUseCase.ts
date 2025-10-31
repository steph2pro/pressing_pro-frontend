import ExpenseApi from '../../../data/datasources/ExpenseApi';
import toast from 'react-hot-toast';

export const deleteExpenseUseCase = async (
  id: number,
  expenseApi: ExpenseApi
): Promise<void> => {
  try {
    await expenseApi.deleteExpense(id);
    toast.success('✅ Dépense supprimée avec succès !');
  } catch (error: any) {
    console.error("Erreur lors de la suppression de la dépense :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};