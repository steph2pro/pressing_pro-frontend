import { AxiosResponse } from 'axios';
import { 
  ActionLog, 
  ActionLogListResponse, 
  LogSearchParams,
  RapportAudit
} from '../models/audit';
import api from './Api';
import { API_ENDPOINTS } from '../../utils/const';
import { mockActionLogs, mockRapportAudit } from '../mock/mockAudit';

export default class AuditApi {
  private useMocks: boolean =true

  /**
   * Récupère la liste paginée des logs d'activité
   */
  async getActionLogs(params?: LogSearchParams): Promise<ActionLogListResponse> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filteredLogs = [...mockActionLogs];
      
      // Filtrage par utilisateur
      if (params?.utilisateurId) {
        filteredLogs = filteredLogs.filter(log => log.utilisateurId === params.utilisateurId);
      }
      
      // Filtrage par module
      if (params?.module) {
        filteredLogs = filteredLogs.filter(log => log.module === params.module);
      }
      
      // Filtrage par action
      if (params?.action) {
        filteredLogs = filteredLogs.filter(log => log.action === params.action);
      }
      
      // Filtrage par date
      if (params?.dateDebut) {
        filteredLogs = filteredLogs.filter(log => 
          new Date(log.dateCreation) >= new Date(params.dateDebut!)
        );
      }
      
      if (params?.dateFin) {
        filteredLogs = filteredLogs.filter(log => 
          new Date(log.dateCreation) <= new Date(params.dateFin!)
        );
      }
      
      // Pagination
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedLogs = filteredLogs.slice(startIndex, endIndex);
      
      return {
        data: paginatedLogs,
        total: filteredLogs.length,
        page,
        limit,
        pages: Math.ceil(filteredLogs.length / limit)
      };
    }

    const response: AxiosResponse<ActionLogListResponse> = await api.get(API_ENDPOINTS.AUDIT_LOGS, { params });
    return response.data;
  }

  /**
   * Génère un rapport d'audit
   */
  async generateAuditReport(params: any): Promise<RapportAudit> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockRapportAudit;
    }

    const response: AxiosResponse<RapportAudit> = await api.post(`${API_ENDPOINTS.AUDIT_LOGS}/report`, params);
    return response.data;
  }

  /**
   * Exporte les logs d'audit
   */
  async exportAuditLogs(params: any): Promise<Blob> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simuler un fichier CSV
      const csvContent = "Date,Utilisateur,Action,Module,Description\n" +
        mockActionLogs.map(log => 
          `${log.dateCreation.toISOString()},${log.utilisateur?.nom},${log.action},${log.module},${log.description}`
        ).join("\n");
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      return blob;
    }

    const response: AxiosResponse<Blob> = await api.post(`${API_ENDPOINTS.AUDIT_LOGS}/export`, params, {
      responseType: 'blob'
    });
    return response.data;
  }
}