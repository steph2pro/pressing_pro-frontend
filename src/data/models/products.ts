// =============================================
// TYPES POUR LA GESTION DES PRODUITS
// =============================================

export interface Categorie {
  id: number;
  nom: string;
  description: string;
  dateCreation: Date;
  dateModification?: Date;
}

export interface Produit {
  id: number;
  nom: string;
  categorieId: number;
  categorie?: Categorie;
  marque: string;
  reference: string;
  quantite: number;
  prixAchat: number;
  prixVente: number;
  unite: string;
  seuilAlerte: number;
  fournisseur: string;
  description: string;
  image?: string;
  statut: 'active' | 'inactive';
  dateCreation: Date;
  dateModification?: Date;
}

// REQUÊTES
export interface CreateCategorieRequest {
  nom: string;
  description: string;
}

export interface UpdateCategorieRequest {
  nom?: string;
  description?: string;
}

export interface CreateProduitRequest {
  nom: string;
  categorieId: number;
  marque: string;
  reference: string;
  quantite: number;
  prixAchat: number;
  prixVente: number;
  unite: string;
  seuilAlerte: number;
  fournisseur: string;
  description: string;
  image?: string;
}

export interface UpdateProduitRequest {
  nom?: string;
  categorieId?: number;
  marque?: string;
  reference?: string;
  quantite?: number;
  prixAchat?: number;
  prixVente?: number;
  unite?: string;
  seuilAlerte?: number;
  fournisseur?: string;
  description?: string;
  image?: string;
  statut?: 'active' | 'inactive';
}

// FILTRES
export interface ProduitSearchParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  categorieId?: number;
  marque?: string;
  fournisseur?: string;
  stockFaible?: boolean;
  prixMin?: number;
  prixMax?: number;
  statut?: 'active' | 'inactive';
}

export interface CategorieSearchParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// RÉPONSES
export interface ProduitListResponse {
  data: Produit[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface ProduitResponse {
  data: Produit;
}

export interface CategorieListResponse {
  data: Categorie[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface CategorieResponse {
  data: Categorie;
}

// ALERTES STOCK
export interface AlerteStock {
  produit: Produit;
  quantiteActuelle: number;
  seuilAlerte: number;
  niveau: 'critique' | 'faible';
  dateAlerte: Date;
}

export interface AlerteStockListResponse {
  data: AlerteStock[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}