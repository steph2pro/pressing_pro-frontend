import { Categorie, CreateCategorieRequest } from '../../../data/models/products';
import ProductApi from '../../../data/datasources/ProductApi';
import toast from 'react-hot-toast';

export const createCategoryUseCase = async (
  payload: CreateCategorieRequest,
  productApi: ProductApi
): Promise<Categorie> => {
  try {
    const response = await productApi.createCategory(payload);
    toast.success('✅ Catégorie créée avec succès !');
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la création de la catégorie :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};