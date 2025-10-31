import { Role, UpdateRoleRequest } from '../../../data/models/roles';
import UserApi from '../../../data/datasources/UserApi';

export const updateRoleUseCase = async (
  userApi: UserApi,
  id: number,
  payload: UpdateRoleRequest
): Promise<Role> => {
  try {
    const response = await userApi.updateRole(id, payload);
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la modification du rôle :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};