import { AxiosResponse } from 'axios';
import { 
  Statistique, 
  StatistiqueListResponse,
  RapportRequest,
  CustomRapportRequest,
  RapportVentesResponse,
  RapportFinancierResponse,
  DonneesGraphique,
  GraphiqueRequest,
  TopProduit,
  PerformanceCategorie
} from '../models/reports';
import api from './Api';
import { API_ENDPOINTS } from '../../utils/const';
import { 
  mockStatistics, 
  mockRapportVentes, 
  mockRapportFinancier,
  mockTopProduits,
  mockPerformanceCategories,
  mockGraphiqueData 
} from '../mock/mockReports';

export default class ReportApi {
  private useMocks: boolean =true

  /**
   * Récupère la liste paginée des statistiques
   */
  async getStatistics(params?: any): Promise<StatistiqueListResponse> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return {
        data: mockStatistics,
        total: mockStatistics.length,
        page: 1,
        limit: 10,
        pages: 1
      };
    }

    const response: AxiosResponse<StatistiqueListResponse> = await api.get(API_ENDPOINTS.STATISTICS, { params });
    return response.data;
  }

  /**
   * Génère un rapport de ventes
   */
  async generateSalesReport(params: RapportRequest): Promise<RapportVentesResponse> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simuler des données basées sur la période
      const rapport = { ...mockRapportVentes };
      rapport.periode = `${params.periode} - ${params.dateDebut?.toISOString().split('T')[0] || '2024-01-15'}`;
      
      return rapport;
    }

    const response: AxiosResponse<RapportVentesResponse> = await api.post(`${API_ENDPOINTS.REPORTS}/sales`, params);
    return response.data;
  }

  /**
   * Génère un rapport financier
   */
  async generateFinancialReport(params: RapportRequest): Promise<RapportFinancierResponse> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const rapport = { ...mockRapportFinancier };
      rapport.periode = `${params.periode} - ${params.dateDebut?.toISOString().split('T')[0] || '2024-01-15'}`;
      
      return rapport;
    }

    const response: AxiosResponse<RapportFinancierResponse> = await api.post(`${API_ENDPOINTS.REPORTS}/financial`, params);
    return response.data;
  }

  /**
   * Génère un rapport personnalisé
   */
  async generateCustomReport(params: CustomRapportRequest): Promise<any> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      let rapport: any = {};
      
      switch (params.typeRapport) {
        case 'ventes':
          rapport = { ...mockRapportVentes };
          break;
        case 'depenses':
          rapport = {
            periode: `${params.dateDebut.toISOString().split('T')[0]} - ${params.dateFin.toISOString().split('T')[0]}`,
            totalDepenses: 1240000,
            depensesParCategorie: [
              { categorie: 'salaire', total: 450000, pourcentage: 36.3 },
              { categorie: 'loyer', total: 300000, pourcentage: 24.2 },
              { categorie: 'maintenance', total: 120000, pourcentage: 9.7 },
              { categorie: 'electricite', total: 75000, pourcentage: 6.0 },
              { categorie: 'internet', total: 50000, pourcentage: 4.0 },
              { categorie: 'transport', total: 35000, pourcentage: 2.8 },
              { categorie: 'fourniture', total: 45000, pourcentage: 3.6 },
              { categorie: 'autre', total: 165000, pourcentage: 13.3 }
            ]
          };
          break;
        case 'stocks':
          rapport = {
            periode: `${params.dateDebut.toISOString().split('T')[0]} - ${params.dateFin.toISOString().split('T')[0]}`,
            totalProduits: 10,
            produitsStockFaible: 3,
            produitsStockCritique: 1,
            valeurStockTotal: 24500000,
            rotationStock: 2.5
          };
          break;
        case 'financier':
          rapport = { ...mockRapportFinancier };
          break;
      }
      
      return rapport;
    }

    const response: AxiosResponse<any> = await api.post(`${API_ENDPOINTS.REPORTS}/custom`, params);
    return response.data;
  }

  /**
   * Récupère les données pour un graphique
   */
  async getChartData(params: GraphiqueRequest): Promise<DonneesGraphique> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 700));
      
      let data: DonneesGraphique;
      
      switch (params.metrique) {
        case 'chiffre_affaire':
          data = mockGraphiqueData.chiffreAffaire;
          break;
        case 'ventes':
          data = mockGraphiqueData.ventes;
          break;
        case 'benefice':
          data = mockGraphiqueData.benefice;
          break;
        case 'depenses':
          data = mockGraphiqueData.depenses;
          break;
        default:
          data = mockGraphiqueData.chiffreAffaire;
      }
      
      return data;
    }

    const response: AxiosResponse<DonneesGraphique> = await api.post(API_ENDPOINTS.CHARTS, params);
    return response.data;
  }

  /**
   * Récupère les produits les plus vendus
   */
  async getTopProducts(): Promise<TopProduit[]> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 600));
      return mockTopProduits;
    }

    const response: AxiosResponse<TopProduit[]> = await api.get(`${API_ENDPOINTS.REPORTS}/top-products`);
    return response.data;
  }

  /**
   * Récupère la performance par catégorie
   */
  async getPerformanceByCategory(): Promise<PerformanceCategorie[]> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 600));
      return mockPerformanceCategories;
    }

    const response: AxiosResponse<PerformanceCategorie[]> = await api.get(`${API_ENDPOINTS.REPORTS}/performance-categories`);
    return response.data;
  }

  /**
   * Exporte un rapport
   */
  async exportReport(params: any): Promise<Blob> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simuler un fichier Excel
      const blob = new Blob(['Mock Excel file content'], { type: 'application/vnd.ms-excel' });
      return blob;
    }

    const response: AxiosResponse<Blob> = await api.post(`${API_ENDPOINTS.REPORTS}/export`, params, {
      responseType: 'blob'
    });
    return response.data;
  }
}