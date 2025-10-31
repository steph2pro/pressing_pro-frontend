import { User, CreateUserRequest } from '../../../data/models/users';
import UserApi from '../../../data/datasources/UserApi';
import toast from 'react-hot-toast';

export const createUserUseCase = async (
  userData: CreateUserRequest,
  userApi: UserApi
): Promise<User> => {
  try {
    const response = await userApi.createUser(userData);
    toast.success('✅ Utilisateur créé avec succès !');
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};