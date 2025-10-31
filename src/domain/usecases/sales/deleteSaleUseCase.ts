import toast from "react-hot-toast";
import SalesApi from "../../../data/datasources/SalesApi";

export const deleteSaleUseCase = async (
  id: number,
  salesApi: SalesApi
): Promise<void> => {
  try {
    await salesApi.deleteSale(id);
    toast.success("✅ Vente supprimée avec succès !");
  } catch (error: any) {
    console.error("Erreur lors de la suppression de la vente :", error);
    const message = error?.response?.data?.error || "Erreur lors de la suppression de la vente";
    toast.error(message);
    throw error;
  }
};