import { DepenseStats } from '../../../data/models/expenses';
import ExpenseApi from '../../../data/datasources/ExpenseApi';

export const getExpensesStatsUseCase = async (
  expenseApi: ExpenseApi
): Promise<DepenseStats> => {
  try {
    const response = await expenseApi.getExpensesStats();
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des statistiques des dépenses :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};