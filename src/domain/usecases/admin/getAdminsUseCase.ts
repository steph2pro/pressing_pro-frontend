import { User } from '../../../data/models/users';
import AdminApi from '../../../data/datasources/AdminApi';

export const getAdminsUseCase = async (
  userApi: AdminApi
): Promise<User[]> => {
  try {
    const response = await userApi.getAdmins();
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des administrateurs :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};