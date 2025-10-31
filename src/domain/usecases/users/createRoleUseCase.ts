import { Role, CreateRoleRequest } from '../../../data/models/roles';
import UserApi from '../../../data/datasources/UserApi';

export const createRoleUseCase = async (
  userApi: UserApi,
  payload: CreateRoleRequest
): Promise<Role> => {
  try {
    const response = await userApi.createRole(payload);
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la création du rôle :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};