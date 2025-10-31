// =============================================
// TYPES POUR LES TRANSACTIONS FINANCIÈRES
// =============================================

export enum TransactionType {
  DEPOT = 'depot',
  RETRAIT = 'retrait'
}

export enum TransactionStatut {
  PENDING = 'pending',
  VALIDATED = 'validated',
  CANCELLED = 'cancelled'
}

export interface Transaction {
  id: number;
  type: TransactionType;
  montant: number;
  statut: TransactionStatut;
  utilisateurId: number;
  utilisateur?: any; // User type sera importé
  validateurId?: number;
  validateur?: any; // User type sera importé
  dateOperation: Date;
  dateValidation?: Date;
  motif?: string;
  commentaire?: string;
  preuve?: string;
  dateCreation: Date;
  dateModification?: Date;
}

// REQUÊTES
export interface CreateTransactionRequest {
  type: TransactionType;
  montant: number;
  dateOperation: Date;
  motif?: string;
  commentaire?: string;
  preuve?: string;
}

export interface ValidationTransactionRequest {
  statut: TransactionStatut.VALIDATED | TransactionStatut.CANCELLED;
  commentaire?: string;
}

// FILTRES
export interface TransactionSearchParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  type?: TransactionType;
  statut?: TransactionStatut;
  dateDebut?: Date;
  dateFin?: Date;
  utilisateurId?: number;
  validateurId?: number;
}

// RÉPONSES
export interface TransactionListResponse {
  data: Transaction[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface TransactionResponse {
  data: Transaction;
}

// SOLDE ET TRÉSORERIE
export interface Solde {
  soldeDisponible: number;
  soldeEnAttente: number;
  totalDepots: number;
  totalRetraits: number;
  dateMiseAJour: Date;
}

export interface MouvementTresorerie {
  date: Date;
  type: 'vente' | 'depense' | 'depot' | 'retrait';
  libelle: string;
  montant: number;
  solde: number;
}