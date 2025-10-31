import ProductApi from '../../../data/datasources/ProductApi';
import toast from 'react-hot-toast';

export const deleteCategoryUseCase = async (
  id: number,
  productApi: ProductApi
): Promise<void> => {
  try {
    await productApi.deleteCategory(id);
    toast.success('✅ Catégorie supprimée avec succès !');
  } catch (error: any) {
    console.error("Erreur lors de la suppression de la catégorie :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};