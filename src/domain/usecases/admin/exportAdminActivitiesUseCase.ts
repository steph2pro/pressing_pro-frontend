import { AdminActivitySearchParams } from '../../../data/models/admin';
import AdminApi from '../../../data/datasources/AdminApi';

export const exportAdminActivitiesUseCase = async (
  userApi: AdminApi,
  params?: AdminActivitySearchParams
): Promise<Blob> => {
  try {
    const response = await userApi.exportAdminActivities(params);
    return response;
  } catch (error: any) {
    console.error("Erreur lors de l'export des activités administrateurs :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};