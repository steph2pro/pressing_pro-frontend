import UserApi from '../../../data/datasources/UserApi';
import toast from 'react-hot-toast';

export const deleteUserUseCase = async (
  id: number,
  userApi: UserApi
): Promise<void> => {
  try {
    await userApi.deleteUser(id);
    toast.success('✅ Utilisateur supprimé avec succès !');
  } catch (error: any) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};