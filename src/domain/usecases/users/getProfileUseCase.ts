import { User } from '../../../data/models/users';
import UserApi from '../../../data/datasources/UserApi';

export const getProfileUseCase = async (
  userApi: UserApi
): Promise<User> => {
  try {
    const profile = await userApi.getProfile();
    return profile;
  } catch (error: any) {
    console.error("Erreur lors de la récupération du profil :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};