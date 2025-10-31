import { 
  AnalyseBenefice, 
  MargeCategorie, 
  ProduitRentable, 
  AnalyseMargeCible,
  SeuilRentabilite 
} from '../models/benefice';
import { mockProducts } from './mockProducts';
import { mockCategories } from './mockProducts';

export const mockAnalyseBenefice: AnalyseBenefice = {
  beneficeNet: 3424000,
  chiffreAffaire: 8560000,
  coutVariables: 3852000,
  coutFixes: 1284000,
  margeMoyenne: 0.40,
  roi: 2.66,
  evolutionBénéfices: [
    { date: "2024-01-01", benefice: 720000, chiffreAffaire: 1800000 },
    { date: "2024-01-08", benefice: 980000, chiffreAffaire: 2450000 },
    { date: "2024-01-15", benefice: 850000, chiffreAffaire: 2125000 },
    { date: "2024-01-22", benefice: 874000, chiffreAffaire: 2185000 }
  ],
  repartitionMarges: [
    { niveau: 'elevee', pourcentage: 0.35, valeur: 1198400 },
    { niveau: 'moyenne', pourcentage: 0.45, valeur: 1540800 },
    { niveau: 'faible', pourcentage: 0.20, valeur: 684800 }
  ]
};

export const mockMargeCategories: MargeCategorie[] = [
  {
    categorieId: 1,
    categorie: mockCategories[0],
    chiffreAffaire: 14235000,
    beneficeTotal: 3650000,
    margeMoyenne: 0.256,
    quantiteVendue: 75,
    coutTotal: 10585000
  },
  {
    categorieId: 2,
    categorie: mockCategories[1],
    chiffreAffaire: 4550000,
    beneficeTotal: 1400000,
    margeMoyenne: 0.308,
    quantiteVendue: 58,
    coutTotal: 3150000
  },
  {
    categorieId: 4,
    categorie: mockCategories[3],
    chiffreAffaire: 1625000,
    beneficeTotal: 650000,
    margeMoyenne: 0.40,
    quantiteVendue: 65,
    coutTotal: 975000
  },
  {
    categorieId: 3,
    categorie: mockCategories[2],
    chiffreAffaire: 1200000,
    beneficeTotal: 400000,
    margeMoyenne: 0.333,
    quantiteVendue: 10,
    coutTotal: 800000
  },
  {
    categorieId: 5,
    categorie: mockCategories[4],
    chiffreAffaire: 400000,
    beneficeTotal: 150000,
    margeMoyenne: 0.375,
    quantiteVendue: 10,
    coutTotal: 250000
  }
];

export const mockProduitsRentables: ProduitRentable[] = [
  {
    produitId: 2,
    produit: mockProducts[1],
    prixAchatMoyen: 350000,
    prixVenteMoyen: 450000,
    margeUnitaire: 100000,
    margePourcentage: 0.222,
    quantiteVendue: 18,
    beneficeTotal: 1800000,
    coutTotal: 6300000
  },
  {
    produitId: 7,
    produit: mockProducts[6],
    prixAchatMoyen: 280000,
    prixVenteMoyen: 380000,
    margeUnitaire: 100000,
    margePourcentage: 0.263,
    quantiteVendue: 12,
    beneficeTotal: 1200000,
    coutTotal: 3360000
  },
  {
    produitId: 1,
    produit: mockProducts[0],
    prixAchatMoyen: 25000,
    prixVenteMoyen: 35000,
    margeUnitaire: 10000,
    margePourcentage: 0.286,
    quantiteVendue: 45,
    beneficeTotal: 450000,
    coutTotal: 1125000
  },
  {
    produitId: 3,
    produit: mockProducts[2],
    prixAchatMoyen: 45000,
    prixVenteMoyen: 65000,
    margeUnitaire: 20000,
    margePourcentage: 0.308,
    quantiteVendue: 28,
    beneficeTotal: 560000,
    coutTotal: 1260000
  },
  {
    produitId: 5,
    produit: mockProducts[4],
    prixAchatMoyen: 15000,
    prixVenteMoyen: 25000,
    margeUnitaire: 10000,
    margePourcentage: 0.40,
    quantiteVendue: 35,
    beneficeTotal: 350000,
    coutTotal: 525000
  },
  {
    produitId: 4,
    produit: mockProducts[3],
    prixAchatMoyen: 80000,
    prixVenteMoyen: 100000,
    margeUnitaire: 20000,
    margePourcentage: 0.20,
    quantiteVendue: 15,
    beneficeTotal: 300000,
    coutTotal: 1200000
  },
  {
    produitId: 6,
    produit: mockProducts[5],
    prixAchatMoyen: 120000,
    prixVenteMoyen: 150000,
    margeUnitaire: 30000,
    margePourcentage: 0.20,
    quantiteVendue: 8,
    beneficeTotal: 240000,
    coutTotal: 960000
  }
];

export const mockAnalyseMargeCible: AnalyseMargeCible = {
  margeCible: 0.30,
  produitsSousMarge: [
    {
      produitId: 4,
      produit: mockProducts[3],
      prixAchatMoyen: 80000,
      prixVenteMoyen: 100000,
      margeUnitaire: 20000,
      margePourcentage: 0.20,
      quantiteVendue: 15,
      beneficeTotal: 300000,
      coutTotal: 1200000
    },
    {
      produitId: 6,
      produit: mockProducts[5],
      prixAchatMoyen: 120000,
      prixVenteMoyen: 150000,
      margeUnitaire: 30000,
      margePourcentage: 0.20,
      quantiteVendue: 8,
      beneficeTotal: 240000,
      coutTotal: 960000
    }
  ],
  produitsAuDessus: mockProduitsRentables.filter(p => p.margePourcentage >= 0.30),
  impactBenefice: 840000
};

export const mockSeuilRentabilite: SeuilRentabilite = {
  coutFixes: 1284000,
  margeUnitaireMoyenne: 85600,
  seuilQuantite: 15,
  seuilChiffreAffaire: 1284000,
  margeSecurite: 0.60
};