import { ConfigurationAlerte } from '../../../data/models/notifications';
import NotificationApi from '../../../data/datasources/NotificationApi';
import toast from 'react-hot-toast';

export const updateAlertConfigurationUseCase = async (
  id: number,
  payload: Partial<ConfigurationAlerte>,
  notificationApi: NotificationApi
): Promise<ConfigurationAlerte> => {
  try {
    const response = await notificationApi.updateAlertConfiguration(id, payload);
    toast.success('✅ Configuration d\'alerte mise à jour avec succès');
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour de la configuration d'alerte :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};