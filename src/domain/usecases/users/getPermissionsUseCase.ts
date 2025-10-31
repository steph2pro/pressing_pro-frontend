import { Permission } from '../../../data/models/users';
import UserApi from '../../../data/datasources/UserApi';

export const getPermissionsUseCase = async (
  userApi: UserApi
): Promise<Permission[]> => {
  try {
    const response = await userApi.getPermissions();
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des permissions :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};