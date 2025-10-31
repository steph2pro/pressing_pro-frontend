import toast from "react-hot-toast";
import ExpenseApi from "../../../data/datasources/ExpenseApi";
import { Depense } from "../../../data/models/Expenses";

export const rejectExpenseUseCase = async (
  id: number,
  expenseApi: ExpenseApi
): Promise<Depense> => {
  try {
    const response = await expenseApi.validateExpense(id, { statut: 'rejected' });
    toast.success("❌ Dépense rejetée avec succès !");
    return response;
  } catch (error: any) {
    console.error("Erreur lors du rejet de la dépense :", error);
    const message = error?.response?.data?.error || "Erreur lors du rejet de la dépense";
    toast.error(message);
    throw error;
  }
};