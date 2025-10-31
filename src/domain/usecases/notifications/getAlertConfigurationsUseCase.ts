import { ConfigurationAlerte } from '../../../data/models/notifications';
import NotificationApi from '../../../data/datasources/NotificationApi';

export const getAlertConfigurationsUseCase = async (
  notificationApi: NotificationApi
): Promise<ConfigurationAlerte[]> => {
  try {
    const response = await notificationApi.getAlertConfigurations();
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des configurations d'alertes :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};