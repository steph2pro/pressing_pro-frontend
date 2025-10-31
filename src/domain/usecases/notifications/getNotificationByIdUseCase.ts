import { Notification } from '../../data/models/notifications';
import NotificationApi from '../../data/datasources/NotificationApi';

export const getNotificationByIdUseCase = async (
  id: number,
  notificationApi: NotificationApi
): Promise<Notification> => {
  try {
    const response = await notificationApi.getNotificationById(id);
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération de la notification :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};