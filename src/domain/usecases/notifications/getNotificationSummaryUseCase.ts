import toast from "react-hot-toast";
import NotificationApi from "../../../data/datasources/NotificationApi";
import { NotificationListResponse, UnreadCountResponse } from "../../../data/models/notifications";

export interface NotificationSummary {
  recentNotifications: NotificationListResponse;
  unreadCount: UnreadCountResponse;
}

export const getNotificationSummaryUseCase = async (
  notificationApi: NotificationApi
): Promise<NotificationSummary> => {
  try {
    const [recentNotifications, unreadCount] = await Promise.all([
      notificationApi.getNotifications({ page: 1, limit: 5 }),
      notificationApi.getUnreadCount()
    ]);

    return {
      recentNotifications,
      unreadCount
    };
  } catch (error: any) {
    console.error("Erreur lors de la récupération du résumé des notifications :", error);
    const message = error?.response?.data?.error || "Erreur lors du chargement du résumé";
    toast.error(message);
    throw error;
  }
};