import toast from "react-hot-toast";
import SalesApi from "../../../data/datasources/SalesApi";
import { Vente, Facture, CreateFactureRequest } from "../../../data/models";

export const generateInvoiceForSaleUseCase = async (
  saleId: number,
  salesApi: SalesApi
): Promise<Facture> => {
  try {
    // Récupérer la vente d'abord
    const sale = await salesApi.getSaleById(saleId);
    
    // Créer la facture
    const invoiceData: CreateFactureRequest = {
      venteId: saleId,
      dateEmission: new Date()
    };
    
    const invoice = await salesApi.createInvoice(invoiceData);
    toast.success("✅ Facture générée avec succès !");
    
    return invoice;
  } catch (error: any) {
    console.error("Erreur lors de la génération de la facture :", error);
    const message = error?.response?.data?.error || "Erreur lors de la génération de la facture";
    toast.error(message);
    throw error;
  }
};