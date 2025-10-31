import NotificationApi from '../../../data/datasources/NotificationApi';
import toast from 'react-hot-toast';

export const deleteNotificationUseCase = async (
  id: number,
  notificationApi: NotificationApi
): Promise<void> => {
  try {
    await notificationApi.deleteNotification(id);
    toast.success('✅ Notification supprimée avec succès');
  } catch (error: any) {
    console.error("Erreur lors de la suppression de la notification :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};