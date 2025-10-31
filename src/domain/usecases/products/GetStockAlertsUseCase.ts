import { AlerteStockListResponse } from '../../../data/models/products';
import ProductApi from '../../../data/datasources/ProductApi';

export const getStockAlertsUseCase = async (
  productApi: ProductApi
): Promise<AlerteStockListResponse> => {
  try {
    const response = await productApi.getStockAlerts();
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des alertes de stock :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};