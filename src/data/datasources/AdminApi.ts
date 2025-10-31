import { 
  AdminStatistics,
  AdminActivity,
  AdminActivityListResponse,
  AdminActivitySearchParams
} from '../models/admin';
import { 
  mockAdmins, 
  mockAdminStatistics, 
  mockAdminActivities 
} from '../mock/mockAdmins';
import { AxiosResponse } from 'axios';
import api from './Api';
import { API_ENDPOINTS } from '../../utils/const';
import { User } from '../models/users';

export default class AdminApi {
  private useMocks: boolean = true;

  // ... méthodes existantes ...

  /**
   * Récupère la liste des administrateurs
   */
  async getAdmins(): Promise<User[]> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 600));
      return mockAdmins;
    }

    const response: AxiosResponse<User[]> = await api.get(`${API_ENDPOINTS.USERS}/admins`);
    return response.data;
  }

  /**
   * Récupère les statistiques des administrateurs
   */
  async getAdminStatistics(): Promise<AdminStatistics> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 700));
      return mockAdminStatistics;
    }

    const response: AxiosResponse<AdminStatistics> = await api.get(`${API_ENDPOINTS.USERS}/admins/statistics`);
    return response.data;
  }

  /**
   * Récupère les activités des administrateurs
   */
  async getAdminActivities(params?: AdminActivitySearchParams): Promise<AdminActivityListResponse> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filteredActivities = [...mockAdminActivities];
      
      // Appliquer les filtres
      if (params?.adminId) {
        filteredActivities = filteredActivities.filter(activity => activity.adminId === params.adminId);
      }
      
      if (params?.action) {
        filteredActivities = filteredActivities.filter(activity => activity.action === params.action);
      }
      
      if (params?.module) {
        filteredActivities = filteredActivities.filter(activity => activity.module === params.module);
      }
      
      if (params?.dateDebut && params?.dateFin) {
        filteredActivities = filteredActivities.filter(activity => 
          activity.timestamp >= params.dateDebut! && activity.timestamp <= params.dateFin!
        );
      }
      
      // Trier
      if (params?.sortBy) {
        filteredActivities.sort((a, b) => {
          const aValue = a[params.sortBy as keyof AdminActivity];
          const bValue = b[params.sortBy as keyof AdminActivity];
          
          if (aValue instanceof Date && bValue instanceof Date) {
            return params.sortOrder === 'asc' 
              ? aValue.getTime() - bValue.getTime()
              : bValue.getTime() - aValue.getTime();
          }
          
          return 0;
        });
      } else {
        // Tri par défaut par date décroissante
        filteredActivities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      }
      
      // Pagination
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedActivities = filteredActivities.slice(startIndex, endIndex);
      
      return {
        data: paginatedActivities,
        total: filteredActivities.length,
        page,
        limit,
        pages: Math.ceil(filteredActivities.length / limit)
      };
    }

    const response: AxiosResponse<AdminActivityListResponse> = await api.get(`${API_ENDPOINTS.USERS}/admins/activities`, { params });
    return response.data;
  }

  /**
   * Exporte les activités des administrateurs
   */
  async exportAdminActivities(params?: AdminActivitySearchParams): Promise<Blob> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const content = 'Rapport des activités administrateurs\n\n' +
        'Date,Administrateur,Action,Module,Détails,IP\n' +
        mockAdminActivities.map(activity => 
          `${activity.timestamp.toISOString()},${activity.admin.nom},${activity.action},${activity.module},${activity.details || ''},${activity.ipAddress || ''}`
        ).join('\n');
      
      const blob = new Blob([content], { type: 'text/csv' });
      return blob;
    }

    const response: AxiosResponse<Blob> = await api.post(`${API_ENDPOINTS.USERS}/admins/activities/export`, params, {
      responseType: 'blob'
    });
    return response.data;
  }
}