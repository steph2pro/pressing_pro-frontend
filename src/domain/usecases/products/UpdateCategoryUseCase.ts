import { Categorie, UpdateCategorieRequest } from '../../../data/models/products';
import ProductApi from '../../../data/datasources/ProductApi';
import toast from 'react-hot-toast';

export const updateCategoryUseCase = async (
  id: number,
  payload: UpdateCategorieRequest,
  productApi: ProductApi
): Promise<Categorie> => {
  try {
    const response = await productApi.updateCategory(id, payload);
    toast.success('✅ Catégorie modifiée avec succès !');
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la modification de la catégorie :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};