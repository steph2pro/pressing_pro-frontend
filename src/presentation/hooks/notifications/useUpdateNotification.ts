import { useState } from 'react';
import { Notification, UpdateNotificationRequest } from '../../../data/models/notifications';
import NotificationApi from '../../../data/datasources/NotificationApi';
import { useQueryClient } from '@tanstack/react-query';
import { updateNotificationUseCase } from '../../../domain/usecases/notifications/updateNotificationUseCase';

export const useUpdateNotification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const notificationApi = new NotificationApi();
  const queryClient = useQueryClient();

  const updateNotification = async (id: number, payload: UpdateNotificationRequest): Promise<Notification | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await updateNotificationUseCase(id, payload, notificationApi);
      setSuccess(true);
      
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notification', id] });
      queryClient.invalidateQueries({ queryKey: ['unreadCount'] });
      
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la mise à jour de la notification');
      console.error('Erreur lors de la mise à jour :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    updateNotification,
    loading,
    error,
    success,
  };
};