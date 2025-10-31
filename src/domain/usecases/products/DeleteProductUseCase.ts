import ProductApi from '../../../data/datasources/ProductApi';
import toast from 'react-hot-toast';

export const deleteProductUseCase = async (
  id: number,
  productApi: ProductApi
): Promise<void> => {
  try {
    await productApi.deleteProduct(id);
    toast.success('✅ Produit supprimé avec succès !');
  } catch (error: any) {
    console.error("Erreur lors de la suppression du produit :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};