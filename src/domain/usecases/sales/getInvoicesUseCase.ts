import toast from "react-hot-toast";
import SalesApi from "../../../data/datasources/SalesApi";
import { FactureListResponse, FactureSearchParams } from "../../../data/models";

export const getInvoicesUseCase = async (
  params?: FactureSearchParams,
  salesApi?: SalesApi
): Promise<FactureListResponse> => {
  try {
    return await salesApi!.getInvoices(params);
  } catch (error: any) {
    console.error("Erreur lors de la récupération des factures :", error);
    const message = error?.response?.data?.error || "Erreur lors du chargement des factures";
    toast.error(message);
    throw error;
  }
};