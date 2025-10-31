import { UserStatistics } from '../../../data/models/users';
import UserApi from '../../../data/datasources/UserApi';

export const getUserStatisticsUseCase = async (
  userApi: UserApi
): Promise<UserStatistics> => {
  try {
    const response = await userApi.getUserStatistics();
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des statistiques utilisateurs :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};