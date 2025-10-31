// =============================================
// TYPES POUR LES VENTES ET FACTURES
// =============================================

export interface LigneVente {
  id: number;
  produitId: number;
  produit?: any; // Produit type sera importé
  venteId: number;
  quantite: number;
  prixVente: number;
  totalLigne: number;
}

export interface Vente {
  id: number;
  dateVente: Date;
  utilisateurId: number;
  utilisateur?: any; // User type sera importé
  client?: string;
  total: number;
  lignes: LigneVente[];
  numeroFacture: string;
  statut: 'completed' | 'cancelled' | 'refunded';
  dateCreation: Date;
  dateModification?: Date;
}

export interface Facture {
  id: number;
  numero: string;
  dateEmission: Date;
  venteId: number;
  vente: Vente;
  totalHT: number;
  totalTVA: number;
  totalTTC: number;
  qrCode?: string;
  statut: 'paid' | 'pending' | 'cancelled';
}

// REQUÊTES
export interface CreateLigneVenteRequest {
  produitId: number;
  quantite: number;
  prixVente: number;
}

export interface CreateVenteRequest {
  dateVente: Date;
  client?: string;
  lignes: CreateLigneVenteRequest[];
}

export interface UpdateVenteRequest {
  client?: string;
  statut?: 'completed' | 'cancelled' | 'refunded';
}

export interface CreateFactureRequest {
  venteId: number;
  dateEmission: Date;
}

// FILTRES
export interface VenteSearchParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  client?: string;
  statut?: string;
  dateDebut?: Date;
  dateFin?: Date;
  utilisateurId?: number;
}

export interface FactureSearchParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  statut?: string;
  dateDebut?: Date;
  dateFin?: Date;
}

// RÉPONSES
export interface VenteListResponse {
  data: Vente[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface VenteResponse {
  data: Vente;
}

export interface FactureListResponse {
  data: Facture[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface FactureResponse {
  data: Facture;
}

// STATISTIQUES VENTES
export interface VenteStats {
  chiffreAffaireTotal: number;
  nombreVentes: number;
  moyennePanier: number;
  produitsVendus: number;
  meilleurClient?: string;
  periode: string;
}