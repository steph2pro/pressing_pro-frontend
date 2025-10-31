import { Role } from '../../../data/models/roles';
import UserApi from '../../../data/datasources/UserApi';

export const getRoleByIdUseCase = async (
  userApi: UserApi,
  id: number
): Promise<Role> => {
  try {
    const response = await userApi.getRoleById(id);
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération du rôle :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};