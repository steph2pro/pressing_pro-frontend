import toast from "react-hot-toast";
import ExpenseApi from "../../../data/datasources/ExpenseApi";
import { Depense } from "../../../data/models/Expenses";

export const bulkValidateExpensesUseCase = async (
  expenseIds: number[],
  status: 'validated' | 'rejected',
  expenseApi: ExpenseApi
): Promise<Depense[]> => {
  try {
    const validationPromises = expenseIds.map(id =>
      expenseApi.validateExpense(id, { statut: status })
    );

    const results = await Promise.all(validationPromises);
    
    const action = status === 'validated' ? 'validées' : 'rejetées';
    toast.success(`✅ ${results.length} dépenses ${action} avec succès !`);
    
    return results;
  } catch (error: any) {
    console.error("Erreur lors de la validation groupée des dépenses :", error);
    const message = error?.response?.data?.error || "Erreur lors de la validation groupée";
    toast.error(message);
    throw error;
  }
};