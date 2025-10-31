import toast from "react-hot-toast";
import SalesApi from "../../../data/datasources/SalesApi";
import { Facture } from "../../../data/models/Sales";

export const getInvoiceByIdUseCase = async (
  id: number,
  salesApi: SalesApi
): Promise<Facture> => {
  try {
    return await salesApi.getInvoiceById(id);
  } catch (error: any) {
    console.error("Erreur lors de la récupération de la facture :", error);
    const message = error?.response?.data?.error || "Facture non trouvée";
    toast.error(message);
    throw error;
  }
};