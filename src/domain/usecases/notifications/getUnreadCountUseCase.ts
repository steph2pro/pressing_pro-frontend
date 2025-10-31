import { UnreadCountResponse } from '../../../data/models/notifications';
import NotificationApi from '../../../data/datasources/NotificationApi';
export const getUnreadCountUseCase = async (
  notificationApi: NotificationApi
): Promise<UnreadCountResponse> => {
  try {
    const response = await notificationApi.getUnreadCount();
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération du compteur de notifications non lues :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};