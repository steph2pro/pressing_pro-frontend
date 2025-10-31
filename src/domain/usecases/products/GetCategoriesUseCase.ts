import { Categorie } from '../../../data/models/products';
import ProductApi from '../../../data/datasources/ProductApi';

export const getCategoriesUseCase = async (
  productApi: ProductApi
): Promise<Categorie[]> => {
  try {
    const response = await productApi.getCategories();
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des catégories :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};