import toast from "react-hot-toast";
import NotificationApi from "../../../data/datasources/NotificationApi";
import { Notification } from "../../../data/models/notifications";

export const markNotificationAsReadUseCase = async (
  id: number,
  notificationApi: NotificationApi
): Promise<Notification> => {
  try {
    const response = await notificationApi.updateNotification(id, { statut: 'lu' });
    toast.success("📬 Notification marquée comme lue");
    return response;
  } catch (error: any) {
    console.error("Erreur lors du marquage de la notification comme lue :", error);
    const message = error?.response?.data?.error || "Erreur lors du marquage de la notification";
    toast.error(message);
    throw error;
  }
};