import { Produit, CreateProduitRequest } from '../../../data/models/products';
import ProductApi from '../../../data/datasources/ProductApi';
import toast from 'react-hot-toast';

export const createProductUseCase = async (
  payload: CreateProduitRequest,
  productApi: ProductApi
): Promise<Produit> => {
  try {
    const response = await productApi.createProduct(payload);
    toast.success('✅ Produit créé avec succès !');
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la création du produit :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};