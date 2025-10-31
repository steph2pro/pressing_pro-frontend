import UserApi from '../../../data/datasources/UserApi';

export const getRoleStatisticsUseCase = async (
  userApi: UserApi
): Promise<any> => {
  try {
    const response = await userApi.getRoleStatistics();
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des statistiques des rôles :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};