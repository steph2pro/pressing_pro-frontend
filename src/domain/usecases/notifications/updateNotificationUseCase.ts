import { Notification, UpdateNotificationRequest } from '../../data/models/notifications';
import NotificationApi from '../../data/datasources/NotificationApi';
import toast from 'react-hot-toast';

export const updateNotificationUseCase = async (
  id: number,
  payload: UpdateNotificationRequest,
  notificationApi: NotificationApi
): Promise<Notification> => {
  try {
    const response = await notificationApi.updateNotification(id, payload);
    
    if (payload.statut === 'lu') {
      toast.success('✅ Notification marquée comme lue');
    }
    
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour de la notification :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};