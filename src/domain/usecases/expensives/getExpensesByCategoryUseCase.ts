import toast from "react-hot-toast";
import ExpenseApi from "../../../data/datasources/ExpenseApi";
import { DepenseListResponse } from "../../../data/models/Expenses";

export interface CategoryExpenses {
  [category: string]: DepenseListResponse;
}

export const getExpensesByCategoryUseCase = async (
  categories: string[],
  expenseApi: ExpenseApi
): Promise<CategoryExpenses> => {
  try {
    const categoryPromises = categories.map(category =>
      expenseApi.getExpenses({ categorie: category, limit: 50 })
    );

    const results = await Promise.all(categoryPromises);
    
    const categoryExpenses: CategoryExpenses = {};
    categories.forEach((category, index) => {
      categoryExpenses[category] = results[index];
    });

    return categoryExpenses;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des dépenses par catégorie :", error);
    const message = error?.response?.data?.error || "Erreur lors du chargement par catégorie";
    toast.error(message);
    throw error;
  }
};