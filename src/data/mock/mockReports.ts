import { Statistique, PeriodeRapport, RapportVentesResponse, RapportFinancierResponse, DonneesGraphique, TopProduit, PerformanceCategorie } from '../models/reports';
import { mockProducts } from './mockProducts';
import { mockCategories } from './mockProducts';

export const mockStatistics: Statistique[] = [
  {
    id: 1,
    periode: PeriodeRapport.HEBDOMADAIRE,
    dateDebut: new Date('2024-01-08'),
    dateFin: new Date('2024-01-14'),
    chiffreAffaire: 2450000,
    benefice: 980000,
    marge: 40,
    produitPlusVendu: "Billet Douala-Paris",
    quantiteProduitPlusVendu: 8,
    totalVentes: 25,
    totalDepenses: 1240000,
    totalTransactions: 12,
    frequenceConnexions: 48,
    utilisateursActifs: 5,
    dateCreation: new Date('2024-01-15T08:00:00')
  },
  {
    id: 2,
    periode: PeriodeRapport.MENSUEL,
    dateDebut: new Date('2024-01-01'),
    dateFin: new Date('2024-01-31'),
    chiffreAffaire: 8560000,
    benefice: 3424000,
    marge: 40,
    produitPlusVendu: "Billet Yaoundé-Douala",
    quantiteProduitPlusVendu: 45,
    totalVentes: 89,
    totalDepenses: 5136000,
    totalTransactions: 35,
    frequenceConnexions: 156,
    utilisateursActifs: 6,
    dateCreation: new Date('2024-02-01T08:00:00')
  },
  {
    id: 3,
    periode: PeriodeRapport.QUOTIDIEN,
    dateDebut: new Date('2024-01-15'),
    dateFin: new Date('2024-01-15'),
    chiffreAffaire: 350000,
    benefice: 140000,
    marge: 40,
    produitPlusVendu: "Billet Yaoundé-Douala",
    quantiteProduitPlusVendu: 6,
    totalVentes: 8,
    totalDepenses: 210000,
    totalTransactions: 3,
    frequenceConnexions: 12,
    utilisateursActifs: 4,
    dateCreation: new Date('2024-01-16T08:00:00')
  }
];

export const mockRapportVentes: RapportVentesResponse = {
  periode: "Hebdomadaire - 2024-01-15",
  chiffreAffaire: 2450000,
  benefice: 980000,
  nombreVentes: 25,
  produitsVendus: 42,
  topProduits: [
    {
      produitId: 2,
      produit: mockProducts[1],
      quantiteVendue: 8,
      chiffreAffaire: 3600000,
      marge: 800000
    },
    {
      produitId: 1,
      produit: mockProducts[0],
      quantiteVendue: 12,
      chiffreAffaire: 420000,
      marge: 120000
    },
    {
      produitId: 7,
      produit: mockProducts[6],
      quantiteVendue: 5,
      chiffreAffaire: 1900000,
      marge: 500000
    }
  ],
  performanceCategories: [
    {
      categorieId: 1,
      categorie: mockCategories[0],
      chiffreAffaire: 5920000,
      quantiteVendue: 25,
      marge: 1420000
    },
    {
      categorieId: 2,
      categorie: mockCategories[1],
      chiffreAffaire: 1950000,
      quantiteVendue: 26,
      marge: 600000
    },
    {
      categorieId: 4,
      categorie: mockCategories[3],
      chiffreAffaire: 625000,
      quantiteVendue: 25,
      marge: 250000
    }
  ],
  evolution: [
    { date: "2024-01-08", chiffreAffaire: 320000, ventes: 3 },
    { date: "2024-01-09", chiffreAffaire: 280000, ventes: 2 },
    { date: "2024-01-10", chiffreAffaire: 450000, ventes: 4 },
    { date: "2024-01-11", chiffreAffaire: 520000, ventes: 5 },
    { date: "2024-01-12", chiffreAffaire: 380000, ventes: 3 },
    { date: "2024-01-13", chiffreAffaire: 250000, ventes: 2 },
    { date: "2024-01-14", chiffreAffaire: 350000, ventes: 3 }
  ]
};

export const mockRapportFinancier: RapportFinancierResponse = {
  periode: "Mensuel - 2024-01-15",
  revenus: 8560000,
  depenses: 5136000,
  beneficeNet: 3424000,
  marge: 40,
  transactions: [
    { date: "2024-01-01", type: "dépôt", montant: 2000000, solde: 2000000 },
    { date: "2024-01-05", type: "retrait", montant: -450000, solde: 1550000 },
    { date: "2024-01-07", type: "retrait", montant: -75000, solde: 1475000 },
    { date: "2024-01-10", type: "dépôt", montant: 1200000, solde: 2675000 },
    { date: "2024-01-12", type: "retrait", montant: -300000, solde: 2375000 },
    { date: "2024-01-15", type: "dépôt", montant: 800000, solde: 3175000 }
  ]
};

export const mockTopProduits: TopProduit[] = [
  {
    produitId: 1,
    produit: mockProducts[0],
    quantiteVendue: 45,
    chiffreAffaire: 1575000,
    marge: 450000
  },
  {
    produitId: 2,
    produit: mockProducts[1],
    quantiteVendue: 18,
    chiffreAffaire: 8100000,
    marge: 1800000
  },
  {
    produitId: 7,
    produit: mockProducts[6],
    quantiteVendue: 12,
    chiffreAffaire: 4560000,
    marge: 1200000
  },
  {
    produitId: 3,
    produit: mockProducts[2],
    quantiteVendue: 28,
    chiffreAffaire: 1820000,
    marge: 560000
  },
  {
    produitId: 5,
    produit: mockProducts[4],
    quantiteVendue: 35,
    chiffreAffaire: 875000,
    marge: 350000
  }
];

export const mockPerformanceCategories: PerformanceCategorie[] = [
  {
    categorieId: 1,
    categorie: mockCategories[0],
    chiffreAffaire: 14235000,
    quantiteVendue: 75,
    marge: 3650000
  },
  {
    categorieId: 2,
    categorie: mockCategories[1],
    chiffreAffaire: 4550000,
    quantiteVendue: 58,
    marge: 1400000
  },
  {
    categorieId: 4,
    categorie: mockCategories[3],
    chiffreAffaire: 1625000,
    quantiteVendue: 65,
    marge: 650000
  },
  {
    categorieId: 3,
    categorie: mockCategories[2],
    chiffreAffaire: 1200000,
    quantiteVendue: 10,
    marge: 400000
  },
  {
    categorieId: 5,
    categorie: mockCategories[4],
    chiffreAffaire: 400000,
    quantiteVendue: 10,
    marge: 150000
  }
];

export const mockGraphiqueData = {
  chiffreAffaire: {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Chiffre d\'affaires (FCFA)',
        data: [320000, 280000, 450000, 520000, 380000, 250000, 350000],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2
      }
    ]
  },
  ventes: {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Nombre de ventes',
        data: [3, 2, 4, 5, 3, 2, 3],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2
      }
    ]
  },
  benefice: {
    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
    datasets: [
      {
        label: 'Bénéfice (FCFA)',
        data: [720000, 980000, 850000, 874000],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2
      }
    ]
  },
  depenses: {
    labels: ['Salaires', 'Loyer', 'Électricité', 'Internet', 'Fournitures', 'Transport', 'Autre'],
    datasets: [
      {
        label: 'Dépenses par catégorie (FCFA)',
        data: [450000, 300000, 75000, 50000, 45000, 35000, 165000],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(199, 199, 199, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)'
        ],
        borderWidth: 1
      }
    ]
  }
};