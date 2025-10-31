import { useState } from 'react';
import NotificationApi from '../../../data/datasources/NotificationApi';
import { useQueryClient } from '@tanstack/react-query';
import { deleteNotificationUseCase } from '../../../domain/usecases/notifications/deleteNotificationUseCase';

export const useDeleteNotification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const notificationApi = new NotificationApi();
  const queryClient = useQueryClient();

  const deleteNotification = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      await deleteNotificationUseCase(id, notificationApi);
      setSuccess(true);
      
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['unreadCount'] });
      
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la suppression de la notification');
      console.error('Erreur lors de la suppression :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteNotification,
    loading,
    error,
    success,
  };
};