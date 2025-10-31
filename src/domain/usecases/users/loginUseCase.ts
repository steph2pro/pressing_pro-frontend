import { LoginRequest, LoginResponse } from '../../../data/models/users';
import UserApi from '../../../data/datasources/UserApi';
import toast from 'react-hot-toast';

export const loginUseCase = async (
  credentials: LoginRequest,
  userApi: UserApi
): Promise<LoginResponse> => {
  try {
    const response = await userApi.login(credentials);
    toast.success('✅ Connexion réussie !');
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la connexion :", error);
    const message = error?.message || "Email ou mot de passe incorrect";
    toast.error(`❌ ${message}`);
    throw error;
  }
};