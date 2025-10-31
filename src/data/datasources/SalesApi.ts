import { AxiosResponse } from 'axios';
import { 
  Vente, 
  VenteListResponse, 
  CreateVenteRequest, 
  UpdateVenteRequest,
  VenteSearchParams,
  LigneVente,
  CreateLigneVenteRequest,
  Facture,
  FactureListResponse,
  CreateFactureRequest,
  FactureSearchParams,
  VenteStats
} from '../models/sales';
import api from './Api';
import { API_ENDPOINTS } from '../../utils/const';
import { mockSales, mockInvoices, mockSalesStats } from '../mock/mockSales';

export default class SalesApi {
  private useMocks: boolean =true

  // ==================== VENTES ====================

  /**
   * Récupère la liste paginée des ventes
   */
  async getSales(params?: VenteSearchParams): Promise<VenteListResponse> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filteredSales = [...mockSales];
      
      // Filtrage par client
      if (params?.client) {
        filteredSales = filteredSales.filter(sale => 
          sale.client?.toLowerCase().includes(params.client!.toLowerCase())
        );
      }
      
      // Filtrage par statut
      if (params?.statut) {
        filteredSales = filteredSales.filter(sale => sale.statut === params.statut);
      }
      
      // Filtrage par date
      if (params?.dateDebut) {
        filteredSales = filteredSales.filter(sale => 
          new Date(sale.dateVente) >= new Date(params.dateDebut!)
        );
      }
      
      if (params?.dateFin) {
        filteredSales = filteredSales.filter(sale => 
          new Date(sale.dateVente) <= new Date(params.dateFin!)
        );
      }
      
      // Pagination
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedSales = filteredSales.slice(startIndex, endIndex);
      
      return {
        data: paginatedSales,
        total: filteredSales.length,
        page,
        limit,
        pages: Math.ceil(filteredSales.length / limit)
      };
    }

    const response: AxiosResponse<VenteListResponse> = await api.get(API_ENDPOINTS.SALES, { params });
    return response.data;
  }

  /**
   * Récupère une vente par son ID
   */
  async getSaleById(id: number): Promise<Vente> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const sale = mockSales.find(s => s.id === id);
      if (!sale) {
        throw new Error('Vente non trouvée');
      }
      return sale;
    }

    const response: AxiosResponse<Vente> = await api.get(API_ENDPOINTS.SALE_BY_ID(id));
    return response.data;
  }

  /**
   * Crée une nouvelle vente
   */
  async createSale(payload: CreateVenteRequest): Promise<Vente> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newSale: Vente = {
        id: Math.max(...mockSales.map(s => s.id)) + 1,
        ...payload,
        utilisateurId: 4, // Mock user ID (caissier)
        total: payload.lignes.reduce((sum, ligne) => sum + (ligne.quantite * ligne.prixVente), 0),
        lignes: [],
        numeroFacture: `FAC-2024-${String(mockSales.length + 1).padStart(3, '0')}`,
        statut: 'completed',
        dateCreation: new Date()
      };
      
      // Créer les lignes de vente
      newSale.lignes = payload.lignes.map((ligne, index) => ({
        id: index + 1,
        ...ligne,
        venteId: newSale.id,
        totalLigne: ligne.quantite * ligne.prixVente
      }));
      
      mockSales.push(newSale);
      return newSale;
    }

    const response: AxiosResponse<Vente> = await api.post(API_ENDPOINTS.SALES, payload);
    return response.data;
  }

  /**
   * Met à jour une vente existante
   */
  async updateSale(id: number, payload: UpdateVenteRequest): Promise<Vente> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const saleIndex = mockSales.findIndex(s => s.id === id);
      if (saleIndex === -1) {
        throw new Error('Vente non trouvée');
      }
      
      mockSales[saleIndex] = {
        ...mockSales[saleIndex],
        ...payload,
        dateModification: new Date()
      };
      
      return mockSales[saleIndex];
    }

    const response: AxiosResponse<Vente> = await api.put(API_ENDPOINTS.SALE_BY_ID(id), payload);
    return response.data;
  }

  /**
   * Supprime une vente
   */
  async deleteSale(id: number): Promise<void> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const saleIndex = mockSales.findIndex(s => s.id === id);
      if (saleIndex === -1) {
        throw new Error('Vente non trouvée');
      }
      
      mockSales.splice(saleIndex, 1);
      return;
    }

    await api.delete(API_ENDPOINTS.SALE_BY_ID(id));
  }

  /**
   * Annule une vente
   */
  async cancelSale(id: number): Promise<Vente> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const saleIndex = mockSales.findIndex(s => s.id === id);
      if (saleIndex === -1) {
        throw new Error('Vente non trouvée');
      }
      
      mockSales[saleIndex].statut = 'cancelled';
      mockSales[saleIndex].dateModification = new Date();
      
      return mockSales[saleIndex];
    }

    const response: AxiosResponse<Vente> = await api.patch(`${API_ENDPOINTS.SALE_BY_ID(id)}/cancel`);
    return response.data;
  }

  // ==================== FACTURES ====================

  /**
   * Récupère la liste paginée des factures
   */
  async getInvoices(params?: FactureSearchParams): Promise<FactureListResponse> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 700));
      
      let filteredInvoices = [...mockInvoices];
      
      // Filtrage par statut
      if (params?.statut) {
        filteredInvoices = filteredInvoices.filter(invoice => invoice.statut === params.statut);
      }
      
      // Pagination
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedInvoices = filteredInvoices.slice(startIndex, endIndex);
      
      return {
        data: paginatedInvoices,
        total: filteredInvoices.length,
        page,
        limit,
        pages: Math.ceil(filteredInvoices.length / limit)
      };
    }

    const response: AxiosResponse<FactureListResponse> = await api.get(API_ENDPOINTS.INVOICES, { params });
    return response.data;
  }

  /**
   * Récupère une facture par son ID
   */
  async getInvoiceById(id: number): Promise<Facture> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const invoice = mockInvoices.find(i => i.id === id);
      if (!invoice) {
        throw new Error('Facture non trouvée');
      }
      return invoice;
    }

    const response: AxiosResponse<Facture> = await api.get(API_ENDPOINTS.INVOICE_BY_ID(id));
    return response.data;
  }

  /**
   * Crée une facture pour une vente
   */
  async createInvoice(payload: CreateFactureRequest): Promise<Facture> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const sale = mockSales.find(s => s.id === payload.venteId);
      if (!sale) {
        throw new Error('Vente non trouvée');
      }
      
      const newInvoice: Facture = {
        id: Math.max(...mockInvoices.map(i => i.id)) + 1,
        numero: `FAC-2024-${String(mockInvoices.length + 1).padStart(3, '0')}`,
        dateEmission: payload.dateEmission,
        venteId: payload.venteId,
        vente: sale,
        totalHT: sale.total * 0.8, // 80% du total comme HT
        totalTVA: sale.total * 0.2, // 20% de TVA
        totalTTC: sale.total,
        statut: 'pending',
        qrCode: `data:image/png;base64,mock-qr-code-${mockInvoices.length + 1}`
      };
      
      mockInvoices.push(newInvoice);
      return newInvoice;
    }

    const response: AxiosResponse<Facture> = await api.post(API_ENDPOINTS.INVOICES, payload);
    return response.data;
  }

  // ==================== STATISTIQUES ====================

  /**
   * Récupère les statistiques de vente
   */
  async getSalesStats(): Promise<VenteStats> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 600));
      return mockSalesStats;
    }

    const response: AxiosResponse<VenteStats> = await api.get(`${API_ENDPOINTS.SALES}/stats`);
    return response.data;
  }
}