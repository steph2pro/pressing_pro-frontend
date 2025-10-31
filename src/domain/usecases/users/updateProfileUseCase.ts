import { User, UpdateProfileRequest } from '../../../data/models/users';
import UserApi from '../../../data/datasources/UserApi';

export const updateProfileUseCase = async (
  userApi: UserApi,
  payload: UpdateProfileRequest
): Promise<User> => {
  try {
    const response = await userApi.updateProfile(payload);
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour du profil :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};