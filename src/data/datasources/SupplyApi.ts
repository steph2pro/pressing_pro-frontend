import { AxiosResponse } from 'axios';
import { 
  Approvisionnement, 
  ApprovisionnementListResponse, 
  CreateApprovisionnementRequest,
  UpdateApprovisionnementRequest,
  ApprovisionnementSearchParams,
  LigneApprovisionnement,
  CreateLigneApprovisionnementRequest,
  AddLigneApprovisionnementRequest,
  Fournisseur,
  FournisseurListResponse
} from '../models/supplies';
import api from './Api';
import { API_ENDPOINTS } from '../../utils/const';
import { mockSupplies, mockFournisseurs } from '../mock/mockSupplies';

export default class SupplyApi {
  private useMocks: boolean =true;

  // constructor(useMocks: boolean = process.env.NODE_ENV === 'development') {
  //   this.useMocks = useMocks;
  // }

  // ==================== APPROVISIONNEMENTS ====================

  /**
   * Récupère la liste paginée des approvisionnements
   */
  async getSupplies(params?: ApprovisionnementSearchParams): Promise<ApprovisionnementListResponse> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filteredSupplies = [...mockSupplies];
      
      // Filtrage par fournisseur
      if (params?.fournisseur) {
        filteredSupplies = filteredSupplies.filter(supply => 
          supply.fournisseur.toLowerCase().includes(params.fournisseur!.toLowerCase())
        );
      }
      
      // Filtrage par statut
      if (params?.statut) {
        filteredSupplies = filteredSupplies.filter(supply => supply.statut === params.statut);
      }
      
      // Filtrage par date
      if (params?.dateDebut) {
        filteredSupplies = filteredSupplies.filter(supply => 
          new Date(supply.dateAppro) >= new Date(params.dateDebut!)
        );
      }
      
      if (params?.dateFin) {
        filteredSupplies = filteredSupplies.filter(supply => 
          new Date(supply.dateAppro) <= new Date(params.dateFin!)
        );
      }
      
      // Pagination
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedSupplies = filteredSupplies.slice(startIndex, endIndex);
      
      return {
        data: paginatedSupplies,
        total: filteredSupplies.length,
        page,
        limit,
        pages: Math.ceil(filteredSupplies.length / limit)
      };
    }

    const response: AxiosResponse<ApprovisionnementListResponse> = await api.get(API_ENDPOINTS.SUPPLIES, { params });
    return response.data;
  }

  /**
   * Récupère un approvisionnement par son ID
   */
  async getSupplyById(id: number): Promise<Approvisionnement> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const supply = mockSupplies.find(s => s.id === id);
      if (!supply) {
        throw new Error('Approvisionnement non trouvé');
      }
      return supply;
    }

    const response: AxiosResponse<Approvisionnement> = await api.get(API_ENDPOINTS.SUPPLY_BY_ID(id));
    return response.data;
  }

  /**
   * Crée un nouvel approvisionnement
   */
  async createSupply(payload: CreateApprovisionnementRequest): Promise<Approvisionnement> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newSupply: Approvisionnement = {
        id: Math.max(...mockSupplies.map(s => s.id)) + 1,
        ...payload,
        utilisateurId: 1, // Mock user ID
        lignes: [],
        total: 0,
        statut: 'draft',
        dateCreation: new Date()
      };
      
      // Calcul du total basé sur les lignes
      newSupply.total = payload.lignes.reduce((sum, ligne) => {
        return sum + (ligne.quantite * ligne.prixAchat);
      }, 0);
      
      mockSupplies.push(newSupply);
      return newSupply;
    }

    const response: AxiosResponse<Approvisionnement> = await api.post(API_ENDPOINTS.SUPPLIES, payload);
    return response.data;
  }

  /**
   * Met à jour un approvisionnement existant
   */
  async updateSupply(id: number, payload: UpdateApprovisionnementRequest): Promise<Approvisionnement> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const supplyIndex = mockSupplies.findIndex(s => s.id === id);
      if (supplyIndex === -1) {
        throw new Error('Approvisionnement non trouvé');
      }
      
      mockSupplies[supplyIndex] = {
        ...mockSupplies[supplyIndex],
        ...payload,
        dateModification: new Date()
      };
      
      return mockSupplies[supplyIndex];
    }

    const response: AxiosResponse<Approvisionnement> = await api.put(API_ENDPOINTS.SUPPLY_BY_ID(id), payload);
    return response.data;
  }

  /**
   * Supprime un approvisionnement
   */
  async deleteSupply(id: number): Promise<void> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const supplyIndex = mockSupplies.findIndex(s => s.id === id);
      if (supplyIndex === -1) {
        throw new Error('Approvisionnement non trouvé');
      }
      
      mockSupplies.splice(supplyIndex, 1);
      return;
    }

    await api.delete(API_ENDPOINTS.SUPPLY_BY_ID(id));
  }

  // ==================== LIGNES D'APPROVISIONNEMENT ====================

  /**
   * Ajoute une ligne à un approvisionnement
   */
  async addSupplyLine(payload: AddLigneApprovisionnementRequest): Promise<LigneApprovisionnement> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const supply = mockSupplies.find(s => s.id === payload.approvisionnementId);
      if (!supply) {
        throw new Error('Approvisionnement non trouvé');
      }
      
      const newLine: LigneApprovisionnement = {
        id: Math.max(...supply.lignes.map(l => l.id)) + 1,
        ...payload.ligne,
        approvisionnementId: payload.approvisionnementId,
        totalLigne: payload.ligne.quantite * payload.ligne.prixAchat
      };
      
      supply.lignes.push(newLine);
      supply.total += newLine.totalLigne;
      
      return newLine;
    }

    const response: AxiosResponse<LigneApprovisionnement> = await api.post(
      API_ENDPOINTS.SUPPLY_LINES(payload.approvisionnementId), 
      payload.ligne
    );
    return response.data;
  }

  // ==================== FOURNISSEURS ====================

  /**
   * Récupère la liste des fournisseurs
   */
  async getFournisseurs(): Promise<Fournisseur[]> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockFournisseurs;
    }

    const response: AxiosResponse<Fournisseur[]> = await api.get('/api/fournisseurs');
    return response.data;
  }
}