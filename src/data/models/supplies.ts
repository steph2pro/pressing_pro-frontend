// =============================================
// TYPES POUR LES APPROVISIONNEMENTS
// =============================================

export interface LigneApprovisionnement {
  id: number;
  produitId: number;
  produit?: any; // Produit type sera importé
  approvisionnementId: number;
  quantite: number;
  prixAchat: number;
  prixVente: number;
  totalLigne: number;
}

export interface Approvisionnement {
  id: number;
  fournisseur: string;
  dateAppro: Date;
  utilisateurId: number;
  utilisateur?: any; // User type sera importé
  lignes: LigneApprovisionnement[];
  total: number;
  statut: 'draft' | 'validated' | 'cancelled';
  dateCreation: Date;
  dateModification?: Date;
}

// REQUÊTES
export interface CreateLigneApprovisionnementRequest {
  produitId: number;
  quantite: number;
  prixAchat: number;
  prixVente: number;
}

export interface CreateApprovisionnementRequest {
  fournisseur: string;
  dateAppro: Date;
  lignes: CreateLigneApprovisionnementRequest[];
}

export interface UpdateApprovisionnementRequest {
  fournisseur?: string;
  dateAppro?: Date;
  statut?: 'draft' | 'validated' | 'cancelled';
}

export interface AddLigneApprovisionnementRequest {
  approvisionnementId: number;
  ligne: CreateLigneApprovisionnementRequest;
}

// FILTRES
export interface ApprovisionnementSearchParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  fournisseur?: string;
  statut?: string;
  dateDebut?: Date;
  dateFin?: Date;
  utilisateurId?: number;
}

// RÉPONSES
export interface ApprovisionnementListResponse {
  data: Approvisionnement[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface ApprovisionnementResponse {
  data: Approvisionnement;
}

// FOURNISSEURS
export interface Fournisseur {
  id: number;
  nom: string;
  contact?: string;
  telephone?: string;
  email?: string;
  adresse?: string;
  dateCreation: Date;
}

export interface FournisseurListResponse {
  data: Fournisseur[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}