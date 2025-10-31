import { ChangePasswordRequest } from '../../../data/models/users';
import UserApi from '../../../data/datasources/UserApi';
import toast from 'react-hot-toast';

export const changePasswordUseCase = async (
  passwordData: ChangePasswordRequest,
  userApi: UserApi
): Promise<void> => {
  try {
    await userApi.changePassword(passwordData);
    toast.success('✅ Mot de passe modifié avec succès !');
  } catch (error: any) {
    console.error("Erreur lors du changement de mot de passe :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};