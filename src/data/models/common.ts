// =============================================
// TYPES COMMUNS ET PARTAGÉS
// =============================================

export interface BaseEntity {
  id: number;
  dateCreation: Date;
  dateModification?: Date;
}

export interface SearchParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  timestamp: Date;
}

export interface ErrorResponse {
  success: false;
  message: string;
  errors?: string[];
  code?: string;
  timestamp: Date;
}

export interface ExportRequest {
  format: 'excel' | 'pdf' | 'csv';
  colonnes: string[];
  filtres?: any;
  dateDebut?: Date;
  dateFin?: Date;
}

export interface ImportRequest {
  fichier: File;
  type: 'produits' | 'utilisateurs' | 'ventes' | 'depenses';
  options?: any;
}

export interface FileUploadResponse {
  success: boolean;
  fichier: {
    nom: string;
    url: string;
    taille: number;
    type: string;
  };
  message?: string;
}