import { AxiosResponse } from 'axios';
import { 
  Notification, 
  NotificationListResponse, 
  UpdateNotificationRequest,
  MarkAllAsReadRequest,
  NotificationSearchParams,
  UnreadCountResponse,
  ConfigurationAlerte,
  StatutNotification
} from '../models/notifications';
import api from './Api';
import { API_ENDPOINTS } from '../../utils/const';
import { mockNotifications, mockUnreadCount, mockAlertConfigurations } from '../mock/mockNotifications';

export default class NotificationApi {
  private useMocks: boolean =true

  /**
   * Récupère la liste paginée des notifications
   */
  async getNotifications(params?: NotificationSearchParams): Promise<NotificationListResponse> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      let filteredNotifications = [...mockNotifications];
      
      // Filtrage par type
      if (params?.type) {
        filteredNotifications = filteredNotifications.filter(notification => notification.type === params.type);
      }
      
      // Filtrage par statut
      if (params?.statut) {
        filteredNotifications = filteredNotifications.filter(notification => notification.statut === params.statut);
      }
      
      // Filtrage par priorité
      if (params?.priorite) {
        filteredNotifications = filteredNotifications.filter(notification => notification.priorite === params.priorite);
      }
      
      // Pagination
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedNotifications = filteredNotifications.slice(startIndex, endIndex);
      
      return {
        data: paginatedNotifications,
        total: filteredNotifications.length,
        page,
        limit,
        pages: Math.ceil(filteredNotifications.length / limit)
      };
    }

    const response: AxiosResponse<NotificationListResponse> = await api.get(API_ENDPOINTS.NOTIFICATIONS, { params });
    return response.data;
  }

  /**
   * Récupère une notification par son ID
   */
  async getNotificationById(id: number): Promise<Notification> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 400));
      const notification = mockNotifications.find(n => n.id === id);
      if (!notification) {
        throw new Error('Notification non trouvée');
      }
      return notification;
    }

    const response: AxiosResponse<Notification> = await api.get(API_ENDPOINTS.NOTIFICATION_BY_ID(id));
    return response.data;
  }

  /**
   * Met à jour le statut d'une notification
   */
  async updateNotification(id: number, payload: UpdateNotificationRequest): Promise<Notification> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const notificationIndex = mockNotifications.findIndex(n => n.id === id);
      if (notificationIndex === -1) {
        throw new Error('Notification non trouvée');
      }
      
      mockNotifications[notificationIndex] = {
        ...mockNotifications[notificationIndex],
        statut: payload.statut,
        dateLecture: payload.statut === 'lu' ? new Date() : undefined,
        // dateModification: new Date()
      };
      
      // Mettre à jour le compteur non lu
      if (payload.statut === 'lu') {
        mockUnreadCount.data.total--;
        if (mockNotifications[notificationIndex].priorite === 'urgente') {
          mockUnreadCount.data.parPriorite.urgente--;
        }
      }
      
      return mockNotifications[notificationIndex];
    }

    const response: AxiosResponse<Notification> = await api.put(API_ENDPOINTS.NOTIFICATION_BY_ID(id), payload);
    return response.data;
  }

  /**
   * Marque toutes les notifications comme lues
   */
  async markAllAsRead(payload: MarkAllAsReadRequest): Promise<void> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      mockNotifications.forEach(notification => {
        if (notification.statut === 'non_lu' && notification.utilisateurId === payload.utilisateurId) {
          notification.statut = StatutNotification.LU;
          notification.dateLecture = new Date();
        }
      });
      
      // Réinitialiser le compteur
      mockUnreadCount.data.total = 0;
      mockUnreadCount.data.parPriorite = {
        urgente: 0,
        haute: 0,
        moyenne: 0,
        basse: 0
      };
      
      return;
    }

    await api.post(API_ENDPOINTS.NOTIFICATIONS_MARK_READ, payload);
  }

  /**
   * Récupère le nombre de notifications non lues
   */
  async getUnreadCount(): Promise<UnreadCountResponse> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockUnreadCount;
    }

    const response: AxiosResponse<UnreadCountResponse> = await api.get(API_ENDPOINTS.NOTIFICATIONS_UNREAD_COUNT);
    return response.data;
  }

  /**
   * Supprime une notification
   */
  async deleteNotification(id: number): Promise<void> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const notificationIndex = mockNotifications.findIndex(n => n.id === id);
      if (notificationIndex === -1) {
        throw new Error('Notification non trouvée');
      }
      
      // Mettre à jour le compteur si non lu
      if (mockNotifications[notificationIndex].statut === 'non_lu') {
        mockUnreadCount.data.total--;
      }
      
      mockNotifications.splice(notificationIndex, 1);
      return;
    }

    await api.delete(API_ENDPOINTS.NOTIFICATION_BY_ID(id));
  }

  /**
   * Récupère les configurations d'alertes
   */
  async getAlertConfigurations(): Promise<ConfigurationAlerte[]> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockAlertConfigurations;
    }

    const response: AxiosResponse<ConfigurationAlerte[]> = await api.get('/api/alert-configurations');
    return response.data;
  }

  /**
   * Met à jour une configuration d'alerte
   */
  async updateAlertConfiguration(id: number, payload: Partial<ConfigurationAlerte>): Promise<ConfigurationAlerte> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const configIndex = mockAlertConfigurations.findIndex(c => c.id === id);
      if (configIndex === -1) {
        throw new Error('Configuration non trouvée');
      }
      
      mockAlertConfigurations[configIndex] = {
        ...mockAlertConfigurations[configIndex],
        ...payload,
        dateModification: new Date()
      };
      
      return mockAlertConfigurations[configIndex];
    }

    const response: AxiosResponse<ConfigurationAlerte> = await api.put(`/api/alert-configurations/${id}`, payload);
    return response.data;
  }
}