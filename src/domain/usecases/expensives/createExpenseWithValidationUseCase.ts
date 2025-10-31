import toast from "react-hot-toast";
import ExpenseApi from "../../../data/datasources/ExpenseApi";
import { CreateDepenseRequest, Depense } from "../../../data/models/Expenses";

export const createExpenseWithValidationUseCase = async (
  expenseData: CreateDepenseRequest,
  expenseApi: ExpenseApi,
  autoValidate: boolean = false
): Promise<Depense> => {
  try {
    // Créer la dépense
    const expense = await expenseApi.createExpense(expenseData);
    
    // Valider automatiquement si demandé et si l'utilisateur a les droits
    if (autoValidate && expenseData.montant <= 100000) { // Seuil pour validation auto
      const validatedExpense = await expenseApi.validateExpense(expense.id, { statut: 'validated' });
      toast.success("💰 Dépense créée et validée automatiquement !");
      return validatedExpense;
    }
    
    toast.success("💰 Dépense créée avec succès ! En attente de validation.");
    return expense;
  } catch (error: any) {
    console.error("Erreur lors de la création de la dépense avec validation :", error);
    const message = error?.response?.data?.error || "Erreur lors de la création de la dépense";
    toast.error(message);
    throw error;
  }
};