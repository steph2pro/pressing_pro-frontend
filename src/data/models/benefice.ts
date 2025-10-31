// =============================================
// TYPES POUR L'ANALYSE DES BÉNÉFICES ET MARGES
// =============================================

import { PeriodeRapport } from "./reports";

export interface AnalyseBenefice {
  beneficeNet: number;
  chiffreAffaire: number;
  coutVariables: number;
  coutFixes: number;
  margeMoyenne: number;
  roi: number;
  evolutionBénéfices: Array<{
    date: string;
    benefice: number;
    chiffreAffaire: number;
  }>;
  repartitionMarges: Array<{
    niveau: 'faible' | 'moyenne' | 'elevee';
    pourcentage: number;
    valeur: number;
  }>;
}

export interface MargeCategorie {
  categorieId: number;
  categorie: any; // Categorie type
  chiffreAffaire: number;
  beneficeTotal: number;
  margeMoyenne: number;
  quantiteVendue: number;
  coutTotal: number;
}

export interface ProduitRentable {
  produitId: number;
  produit: any; // Produit type
  prixAchatMoyen: number;
  prixVenteMoyen: number;
  margeUnitaire: number;
  margePourcentage: number;
  quantiteVendue: number;
  beneficeTotal: number;
  coutTotal: number;
}

export interface AnalyseMargeCible {
  margeCible: number;
  produitsSousMarge: ProduitRentable[];
  produitsAuDessus: ProduitRentable[];
  impactBenefice: number;
}

export interface SeuilRentabilite {
  coutFixes: number;
  margeUnitaireMoyenne: number;
  seuilQuantite: number;
  seuilChiffreAffaire: number;
  margeSecurite: number;
}

// REQUÊTES SPÉCIFIQUES
export interface AnalyseBeneficeRequest {
  periode: PeriodeRapport;
  dateDebut: Date;
  dateFin: Date;
  includeDetails?: boolean;
}

export interface AnalyseMargeRequest {
  margeCible: number;
  dateDebut: Date;
  dateFin: Date;
}