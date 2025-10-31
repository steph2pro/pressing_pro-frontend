import { useState } from 'react';
import { MarkAllAsReadRequest } from '../../../data/models/notifications';
import NotificationApi from '../../../data/datasources/NotificationApi';
import { useQueryClient } from '@tanstack/react-query';
import { markAllAsReadUseCase } from '../../../domain/usecases/notifications/markAllAsReadUseCase';

export const useMarkAllAsRead = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const notificationApi = new NotificationApi();
  const queryClient = useQueryClient();

  const markAllAsRead = async (payload: MarkAllAsReadRequest): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      await markAllAsReadUseCase(payload, notificationApi);
      setSuccess(true);
      
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['unreadCount'] });
      
    } catch (err: any) {
      setError(err.message || 'Erreur lors du marquage des notifications comme lues');
      console.error('Erreur lors du marquage :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    markAllAsRead,
    loading,
    error,
    success,
  };
};