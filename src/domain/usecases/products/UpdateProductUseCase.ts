import { Produit, UpdateProduitRequest } from '../../../data/models/products';
import ProductApi from '../../../data/datasources/ProductApi';
import toast from 'react-hot-toast';

export const updateProductUseCase = async (
  id: number,
  payload: UpdateProduitRequest,
  productApi: ProductApi
): Promise<Produit> => {
  try {
    const response = await productApi.updateProduct(id, payload);
    toast.success('✅ Produit modifié avec succès !');
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la modification du produit :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};