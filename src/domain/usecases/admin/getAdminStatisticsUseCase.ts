import { AdminStatistics } from '../../../data/models/admin';
import AdminApi from '../../../data/datasources/AdminApi';

export const getAdminStatisticsUseCase = async (
  userApi: AdminApi
): Promise<AdminStatistics> => {
  try {
    const response = await userApi.getAdminStatistics();
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des statistiques administrateurs :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};