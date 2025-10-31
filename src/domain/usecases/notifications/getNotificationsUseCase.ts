import { NotificationListResponse, NotificationSearchParams } from '../../data/models/notifications';
import NotificationApi from '../../data/datasources/NotificationApi';

export const getNotificationsUseCase = async (
  notificationApi: NotificationApi,
  params?: NotificationSearchParams
): Promise<NotificationListResponse> => {
  try {
    const response = await notificationApi.getNotifications(params);
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des notifications :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};