import { UserListResponse, UserSearchParams } from '../../../data/models/users';
import UserApi from '../../../data/datasources/UserApi';

export const getUsersUseCase = async (
  userApi: UserApi,
  params?: UserSearchParams
): Promise<UserListResponse> => {
  try {
    const response = await userApi.getUsers(params);
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};