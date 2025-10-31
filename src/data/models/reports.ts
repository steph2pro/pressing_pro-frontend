// =============================================
// TYPES POUR LES RAPPORTS ET STATISTIQUES
// =============================================

export enum PeriodeRapport {
  QUOTIDIEN = 'quotidien',
  HEBDOMADAIRE = 'hebdomadaire',
  MENSUEL = 'mensuel',
  ANNUEL = 'annuel'
}

export interface Statistique {
  id: number;
  periode: PeriodeRapport;
  dateDebut: Date;
  dateFin: Date;
  chiffreAffaire: number;
  benefice: number;
  marge: number;
  produitPlusVendu: string;
  quantiteProduitPlusVendu: number;
  totalVentes: number;
  totalDepenses: number;
  totalTransactions: number;
  frequenceConnexions: number;
  utilisateursActifs: number;
  dateCreation: Date;
}

export interface TopProduit {
  produitId: number;
  produit: any; // Produit type sera importé
  quantiteVendue: number;
  chiffreAffaire: number;
  marge: number;
}

export interface PerformanceCategorie {
  categorieId: number;
  categorie: any; // Categorie type sera importé
  chiffreAffaire: number;
  quantiteVendue: number;
  marge: number;
}

// REQUÊTES
export interface RapportRequest {
  periode: PeriodeRapport;
  dateDebut?: Date;
  dateFin?: Date;
  categorieId?: number;
  utilisateurId?: number;
}

export interface CustomRapportRequest {
  dateDebut: Date;
  dateFin: Date;
  typeRapport: 'ventes' | 'depenses' | 'stocks' | 'financier';
  groupBy?: 'jour' | 'semaine' | 'mois' | 'categorie' | 'produit';
}

// RÉPONSES
export interface StatistiqueListResponse {
  data: Statistique[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface StatistiqueResponse {
  data: Statistique;
}

export interface RapportVentesResponse {
  periode: string;
  chiffreAffaire: number;
  benefice: number;
  nombreVentes: number;
  produitsVendus: number;
  topProduits: TopProduit[];
  performanceCategories: PerformanceCategorie[];
  evolution: Array<{
    date: string;
    chiffreAffaire: number;
    ventes: number;
  }>;
}

export interface RapportFinancierResponse {
  periode: string;
  revenus: number;
  depenses: number;
  beneficeNet: number;
  marge: number;
  transactions: Array<{
    date: string;
    type: string;
    montant: number;
    solde: number;
  }>;
}

// GRAPHIQUES
export interface DonneesGraphique {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string;
    borderWidth?: number;
  }[];
}

export interface GraphiqueRequest {
  type: 'barres' | 'courbes' | 'camembert' | 'ligne';
  periode: PeriodeRapport;
  metrique: 'chiffre_affaire' | 'ventes' | 'benefice' | 'depenses';
  dateDebut?: Date;
  dateFin?: Date;
}