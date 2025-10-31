import toast from "react-hot-toast";
import NotificationApi from "../../../data/datasources/NotificationApi";

export const cleanupOldNotificationsUseCase = async (
  daysOld: number = 30,
  notificationApi: NotificationApi
): Promise<void> => {
  try {
    // Récupérer toutes les notifications anciennes
    const allNotifications = await notificationApi.getNotifications({ limit: 1000 });
    const oldNotifications = allNotifications.data.filter(notification => {
      const notificationDate = new Date(notification.dateCreation);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysOld);
      return notificationDate < cutoffDate && notification.statut === 'lu';
    });

    // Supprimer les anciennes notifications
    const deletePromises = oldNotifications.map(notification =>
      notificationApi.deleteNotification(notification.id)
    );

    await Promise.all(deletePromises);
    toast.success(`🧹 ${oldNotifications.length} anciennes notifications nettoyées`);
  } catch (error: any) {
    console.error("Erreur lors du nettoyage des anciennes notifications :", error);
    const message = error?.response?.data?.error || "Erreur lors du nettoyage des notifications";
    toast.error(message);
    throw error;
  }
};