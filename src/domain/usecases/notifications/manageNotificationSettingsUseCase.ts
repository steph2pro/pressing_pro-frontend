import toast from "react-hot-toast";
import NotificationApi from "../../../data/datasources/NotificationApi";
import { ConfigurationAlerte } from "../../../data/models/notifications";

export const manageNotificationSettingsUseCase = async (
  configurations: ConfigurationAlerte[],
  notificationApi: NotificationApi
): Promise<ConfigurationAlerte[]> => {
  try {
    const updatePromises = configurations.map(config =>
      notificationApi.updateAlertConfiguration(config.id, {
        active: config.active,
        seuil: config.seuil,
        canaux: config.canaux
      })
    );

    const results = await Promise.all(updatePromises);
    toast.success("🔔 Paramètres de notification mis à jour avec succès");
    return results;
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour des paramètres de notification :", error);
    const message = error?.response?.data?.error || "Erreur lors de la mise à jour des paramètres";
    toast.error(message);
    throw error;
  }
};