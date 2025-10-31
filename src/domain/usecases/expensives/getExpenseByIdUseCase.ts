import { Depense } from '../../../data/models/expenses';
import ExpenseApi from '../../../data/datasources/ExpenseApi';

export const getExpenseByIdUseCase = async (
  id: number,
  expenseApi: ExpenseApi
): Promise<Depense> => {
  try {
    const response = await expenseApi.getExpenseById(id);
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération de la dépense :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};