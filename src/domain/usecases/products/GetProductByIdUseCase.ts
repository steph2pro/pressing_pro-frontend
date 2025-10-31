import { Produit } from '../../../data/models/products';
import ProductApi from '../../../data/datasources/ProductApi';

export const getProductByIdUseCase = async (
  id: number,
  productApi: ProductApi
): Promise<Produit> => {
  try {
    const response = await productApi.getProductById(id);
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération du produit :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};