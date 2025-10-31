import { useState } from 'react';
import { ConfigurationAlerte } from '../../../data/models/notifications';
import NotificationApi from '../../../data/datasources/NotificationApi';
import { useQueryClient } from '@tanstack/react-query';
import { updateAlertConfigurationUseCase } from '../../../domain/usecases/notifications/updateAlertConfigurationUseCase';

export const useUpdateAlertConfiguration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const notificationApi = new NotificationApi();
  const queryClient = useQueryClient();

  const updateAlertConfiguration = async (id: number, payload: Partial<ConfigurationAlerte>): Promise<ConfigurationAlerte | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await updateAlertConfigurationUseCase(id, payload, notificationApi);
      setSuccess(true);
      
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['alertConfigurations'] });
      
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la mise à jour de la configuration d\'alerte');
      console.error('Erreur lors de la mise à jour :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    updateAlertConfiguration,
    loading,
    error,
    success,
  };
};