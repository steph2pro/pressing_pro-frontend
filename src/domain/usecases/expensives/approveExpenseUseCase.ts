import toast from "react-hot-toast";
import ExpenseApi from "../../../data/datasources/ExpenseApi";
import { Depense } from "../../../data/models/Expenses";

export const approveExpenseUseCase = async (
  id: number,
  expenseApi: ExpenseApi
): Promise<Depense> => {
  try {
    const response = await expenseApi.validateExpense(id, { statut: 'validated' });
    toast.success("✅ Dépense approuvée avec succès !");
    return response;
  } catch (error: any) {
    console.error("Erreur lors de l'approbation de la dépense :", error);
    const message = error?.response?.data?.error || "Erreur lors de l'approbation de la dépense";
    toast.error(message);
    throw error;
  }
};