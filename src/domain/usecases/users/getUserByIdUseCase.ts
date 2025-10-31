import { User } from '../../../data/models/users';
import UserApi from '../../../data/datasources/UserApi';

export const getUserByIdUseCase = async (
  id: number,
  userApi: UserApi
): Promise<User> => {
  try {
    const user = await userApi.getUserById(id);
    return user;
  } catch (error: any) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    const message = error?.response?.data?.error || "Utilisateur non trouvé";
    throw new Error(message);
  }
};