import { 
  AnalyseBenefice,
  MargeCategorie,
  ProduitRentable,
  AnalyseMargeCible,
  SeuilRentabilite,
  AnalyseBeneficeRequest,
  AnalyseMargeRequest
} from '../models/benefice';
import { 
  mockAnalyseBenefice, 
  mockMargeCategories, 
  mockProduitsRentables,
  mockAnalyseMargeCible,
  mockSeuilRentabilite
} from '../mock/mockProfitAnalysis';
import { AxiosResponse } from 'axios';
import api from './Api';
import { API_ENDPOINTS } from '../../utils/const';

export default class ReportApi {
  private useMocks: boolean = true;

  /**
   * Récupère l'analyse des bénéfices
   */
  async getProfitAnalysis(params: AnalyseBeneficeRequest): Promise<AnalyseBenefice> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Adapter les données mockées selon la période
      const analyse = { ...mockAnalyseBenefice };
      
      // Simuler des variations selon la période
      if (params.periode === 'quotidien') {
        analyse.beneficeNet = 140000;
        analyse.chiffreAffaire = 350000;
      } else if (params.periode === 'hebdomadaire') {
        analyse.beneficeNet = 980000;
        analyse.chiffreAffaire = 2450000;
      }
      
      return analyse;
    }

    const response: AxiosResponse<AnalyseBenefice> = await api.post(`${API_ENDPOINTS.REPORTS}/profit-analysis`, params);
    return response.data;
  }

  /**
   * Récupère les marges par catégorie
   */
  async getMarginByCategory(params: AnalyseBeneficeRequest): Promise<MargeCategorie[]> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Adapter selon la période
      let categories = [...mockMargeCategories];
      
      if (params.periode === 'quotidien') {
        categories = categories.map(cat => ({
          ...cat,
          chiffreAffaire: Math.round(cat.chiffreAffaire / 30),
          beneficeTotal: Math.round(cat.beneficeTotal / 30),
          quantiteVendue: Math.round(cat.quantiteVendue / 30)
        }));
      } else if (params.periode === 'hebdomadaire') {
        categories = categories.map(cat => ({
          ...cat,
          chiffreAffaire: Math.round(cat.chiffreAffaire / 4),
          beneficeTotal: Math.round(cat.beneficeTotal / 4),
          quantiteVendue: Math.round(cat.quantiteVendue / 4)
        }));
      }
      
      return categories;
    }

    const response: AxiosResponse<MargeCategorie[]> = await api.post(`${API_ENDPOINTS.REPORTS}/margin-by-category`, params);
    return response.data;
  }

  /**
   * Récupère les produits les plus rentables
   */
  async getTopProfitableProducts(params: AnalyseBeneficeRequest): Promise<ProduitRentable[]> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 700));
      
      let produits = [...mockProduitsRentables];
      
      // Trier par bénéfice total décroissant
      produits.sort((a, b) => b.beneficeTotal - a.beneficeTotal);
      
      // Adapter selon la période
      if (params.periode === 'quotidien') {
        produits = produits.map(prod => ({
          ...prod,
          quantiteVendue: Math.round(prod.quantiteVendue / 30),
          beneficeTotal: Math.round(prod.beneficeTotal / 30),
          coutTotal: Math.round(prod.coutTotal / 30)
        }));
      } else if (params.periode === 'hebdomadaire') {
        produits = produits.map(prod => ({
          ...prod,
          quantiteVendue: Math.round(prod.quantiteVendue / 4),
          beneficeTotal: Math.round(prod.beneficeTotal / 4),
          coutTotal: Math.round(prod.coutTotal / 4)
        }));
      }
      
      return produits.slice(0, 20); // Retourner les 20 premiers
    }

    const response: AxiosResponse<ProduitRentable[]> = await api.post(`${API_ENDPOINTS.REPORTS}/top-profitable-products`, params);
    return response.data;
  }

  /**
   * Analyse les produits en dessous d'une marge cible
   */
  async analyzeMarginTarget(params: AnalyseMargeRequest): Promise<AnalyseMargeCible> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 900));
      
      const analyse = { ...mockAnalyseMargeCible };
      analyse.margeCible = params.margeCible;
      
      // Filtrer les produits selon la marge cible
      analyse.produitsSousMarge = mockProduitsRentables.filter(
        p => p.margePourcentage < params.margeCible
      );
      analyse.produitsAuDessus = mockProduitsRentables.filter(
        p => p.margePourcentage >= params.margeCible
      );
      
      // Calculer l'impact potentiel
      analyse.impactBenefice = analyse.produitsSousMarge.reduce(
        (total, prod) => total + (prod.beneficeTotal * (params.margeCible - prod.margePourcentage) / prod.margePourcentage),
        0
      );
      
      return analyse;
    }

    const response: AxiosResponse<AnalyseMargeCible> = await api.post(`${API_ENDPOINTS.REPORTS}/margin-target-analysis`, params);
    return response.data;
  }

  /**
   * Calcule le seuil de rentabilité
   */
  async calculateBreakEven(params: AnalyseBeneficeRequest): Promise<SeuilRentabilite> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const seuil = { ...mockSeuilRentabilite };
      
      // Adapter selon la période
      if (params.periode === 'quotidien') {
        seuil.coutFixes = Math.round(seuil.coutFixes / 30);
        seuil.seuilChiffreAffaire = Math.round(seuil.seuilChiffreAffaire / 30);
      } else if (params.periode === 'hebdomadaire') {
        seuil.coutFixes = Math.round(seuil.coutFixes / 4);
        seuil.seuilChiffreAffaire = Math.round(seuil.seuilChiffreAffaire / 4);
      }
      
      return seuil;
    }

    const response: AxiosResponse<SeuilRentabilite> = await api.post(`${API_ENDPOINTS.REPORTS}/break-even-analysis`, params);
    return response.data;
  }

  /**
   * Exporte l'analyse de rentabilité
   */
  async exportProfitAnalysis(params: any): Promise<Blob> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simuler un fichier Excel
      const content = 'Rapport d\'analyse de rentabilité\n\n' +
        `Période: ${params.dateDebut} - ${params.dateFin}\n` +
        `Bénéfice net: ${mockAnalyseBenefice.beneficeNet} FCFA\n` +
        `Marge moyenne: ${(mockAnalyseBenefice.margeMoyenne * 100).toFixed(1)}%\n` +
        `ROI: ${(mockAnalyseBenefice.roi * 100).toFixed(1)}%`;
      
      const blob = new Blob([content], { 
        type: params.format === 'pdf' ? 'application/pdf' : 'application/vnd.ms-excel' 
      });
      return blob;
    }

    const response: AxiosResponse<Blob> = await api.post(`${API_ENDPOINTS.REPORTS}/export-profit-analysis`, params, {
      responseType: 'blob'
    });
    return response.data;
  }
}