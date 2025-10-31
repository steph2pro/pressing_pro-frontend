import toast from "react-hot-toast";
import ExpenseApi from "../../../data/datasources/ExpenseApi";
import { DepenseListResponse, DepenseStats } from "../../../data/models/Expenses";

export interface ExpensesDashboardData {
  recentExpenses: DepenseListResponse;
  stats: DepenseStats;
  pendingExpenses: DepenseListResponse;
}

export const getExpensesDashboardDataUseCase = async (
  expenseApi: ExpenseApi
): Promise<ExpensesDashboardData> => {
  try {
    const [recentExpenses, stats, pendingExpenses] = await Promise.all([
      expenseApi.getExpenses({ page: 1, limit: 5 }),
      expenseApi.getExpensesStats(),
      expenseApi.getExpenses({ statut: 'pending', page: 1, limit: 5 })
    ]);

    return {
      recentExpenses,
      stats,
      pendingExpenses
    };
  } catch (error: any) {
    console.error("Erreur lors de la récupération des données du dashboard dépenses :", error);
    const message = error?.response?.data?.error || "Erreur lors du chargement du dashboard";
    toast.error(message);
    throw error;
  }
};