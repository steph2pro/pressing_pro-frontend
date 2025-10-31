import { AdminActivityListResponse, AdminActivitySearchParams } from '../../../data/models/admin';
import AdminApi from '../../../data/datasources/AdminApi';

export const getAdminActivitiesUseCase = async (
  userApi: AdminApi,
  params?: AdminActivitySearchParams
): Promise<AdminActivityListResponse> => {
  try {
    const response = await userApi.getAdminActivities(params);
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des activités administrateurs :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};