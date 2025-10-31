import { RoleListResponse, RoleSearchParams } from '../../../data/models/roles';
import UserApi from '../../../data/datasources/UserApi';

export const getRolesUseCase = async (
  userApi: UserApi,
  params?: RoleSearchParams
): Promise<RoleListResponse> => {
  try {
    const response = await userApi.getRoles(params);
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des rôles :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};