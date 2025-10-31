import { User, UpdateUserRequest } from '../../../data/models/users';
import UserApi from '../../../data/datasources/UserApi';
import toast from 'react-hot-toast';

export const updateUserUseCase = async (
  id: number,
  userData: UpdateUserRequest,
  userApi: UserApi
): Promise<User> => {
  try {
    const response = await userApi.updateUser(id, userData);
    toast.success('✅ Utilisateur modifié avec succès !');
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la modification de l'utilisateur :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};