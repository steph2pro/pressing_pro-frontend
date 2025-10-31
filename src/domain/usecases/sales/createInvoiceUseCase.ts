import toast from "react-hot-toast";
import SalesApi from "../../../data/datasources/SalesApi";
import { CreateFactureRequest, Facture } from "../../../data/models";

export const createInvoiceUseCase = async (
  invoiceData: CreateFactureRequest,
  salesApi: SalesApi
): Promise<Facture> => {
  try {
    const response = await salesApi.createInvoice(invoiceData);
    toast.success("✅ Facture créée avec succès !");
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la création de la facture :", error);
    const message = error?.response?.data?.error || "Erreur lors de la création de la facture";
    toast.error(message);
    throw error;
  }
};