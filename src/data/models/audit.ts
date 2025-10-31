// =============================================
// TYPES POUR LA TRAÇABILITÉ ET AUDIT
// =============================================

export enum ModuleAction {
  AUTHENTIFICATION = 'authentification',
  PRODUIT = 'produit',
  APPROVISIONNEMENT = 'approvisionnement',
  VENTE = 'vente',
  DEPENSE = 'depense',
  TRANSACTION = 'transaction',
  UTILISATEUR = 'utilisateur',
  SYSTEME = 'systeme',
  REPORT ='raport'
}

export enum TypeAction {
  CREATION = 'creation',
  MODIFICATION = 'modification',
  SUPPRESSION = 'suppression',
  CONNEXION = 'connexion',
  DECONNEXION = 'deconnexion',
  VALIDATION = 'validation',
  REJET = 'rejet',
  LECTURE = 'lecture',
  EXPORT = 'export'
}

export interface ActionLog {
  id: number;
  utilisateurId: number;
  utilisateur?: any; // User type sera importé
  action: TypeAction;
  module: ModuleAction;
  description: string;
  anciennesValeurs?: any;
  nouvellesValeurs?: any;
  ipAddress?: string;
  userAgent?: string;
  dateCreation: Date;
}

// FILTRES
export interface LogSearchParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  utilisateurId?: number;
  module?: ModuleAction;
  action?: TypeAction;
  dateDebut?: Date;
  dateFin?: Date;
}

// RÉPONSES
export interface ActionLogListResponse {
  data: ActionLog[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

// RAPPORT AUDIT
export interface RapportAudit {
  periode: string;
  totalActions: number;
  actionsParModule: Array<{
    module: ModuleAction;
    count: number;
  }>;
  actionsParUtilisateur: Array<{
    utilisateur: any; // User type sera importé
    count: number;
  }>;
  activiteQuotidienne: Array<{
    date: string;
    count: number;
  }>;
}