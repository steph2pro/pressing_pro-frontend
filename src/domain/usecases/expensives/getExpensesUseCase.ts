import { DepenseListResponse, DepenseSearchParams } from '../../../data/models/expenses';
import ExpenseApi from '../../../data/datasources/ExpenseApi';

export const getExpensesUseCase = async (
  expenseApi: ExpenseApi,
  params?: DepenseSearchParams
): Promise<DepenseListResponse> => {
  try {
    const response = await expenseApi.getExpenses(params);
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des dépenses :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};