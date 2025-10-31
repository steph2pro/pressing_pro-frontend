import { MarkAllAsReadRequest } from '../../data/models/notifications';
import NotificationApi from '../../data/datasources/NotificationApi';
import toast from 'react-hot-toast';

export const markAllAsReadUseCase = async (
  payload: MarkAllAsReadRequest,
  notificationApi: NotificationApi
): Promise<void> => {
  try {
    await notificationApi.markAllAsRead(payload);
    toast.success('✅ Toutes les notifications marquées comme lues');
  } catch (error: any) {
    console.error("Erreur lors du marquage des notifications comme lues :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};