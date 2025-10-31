// =============================================
// TYPES POUR LES DÉPENSES
// =============================================

export enum DepenseCategorie {
  SALAIRE = 'salaire',
  ELECTRICITE = 'electricite',
  INTERNET = 'internet',
  LOYER = 'loyer',
  FOURNITURE = 'fourniture',
  MAINTENANCE = 'maintenance',
  TRANSPORT = 'transport',
  AUTRE = 'autre'
}

export enum DepenseStatut {
  PENDING = 'pending',
  VALIDATED = 'validated',
  REJECTED = 'rejected'
}

export interface Depense {
  id: number;
  libelle: string;
  categorie: DepenseCategorie;
  montant: number;
  statut: DepenseStatut;
  utilisateurId: number;
  utilisateur?: any; // User type sera importé
  validateurId?: number;
  validateur?: any; // User type sera importé
  dateValidation?: Date;
  commentaire?: string;
  justificatif?: string;
  dateCreation: Date;
  dateModification?: Date;
}

// REQUÊTES
export interface CreateDepenseRequest {
  libelle: string;
  categorie: DepenseCategorie;
  montant: number;
  commentaire?: string;
  justificatif?: string;
}

export interface UpdateDepenseRequest {
  libelle?: string;
  categorie?: DepenseCategorie;
  montant?: number;
  commentaire?: string;
  justificatif?: string;
}

export interface ValidationDepenseRequest {
  statut: DepenseStatut.VALIDATED | DepenseStatut.REJECTED | DepenseStatut.PENDING;
  commentaireValidation?: string;
}

// FILTRES
export interface DepenseSearchParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  categorie?: DepenseCategorie;
  statut?: DepenseStatut;
  dateDebut?: Date;
  dateFin?: Date;
  utilisateurId?: number;
  validateurId?: number;
}

// RÉPONSES
export interface DepenseListResponse {
  data: Depense[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface DepenseResponse {
  data: Depense;
}

// STATISTIQUES DÉPENSES
export interface DepenseStats {
  totalDepenses: number;
  depensesParCategorie: {
    categorie: DepenseCategorie;
    total: number;
    pourcentage: number;
  }[];
  depensesEnAttente: number;
  moyenneMensuelle: number;
}