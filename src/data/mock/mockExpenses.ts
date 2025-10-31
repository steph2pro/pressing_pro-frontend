import { Depense, DepenseCategorie, DepenseStatut, DepenseStats } from '../models/expenses';
import { mockUsers } from './mockUsers';

export const mockExpenses: Depense[] = [
  {
    id: 1,
    libelle: "Salaire janvier - Marie Dupont",
    categorie: DepenseCategorie.SALAIRE,
    montant: 450000,
    statut: DepenseStatut.VALIDATED,
    utilisateurId: 2,
    utilisateur: mockUsers[1],
    validateurId: 1,
    validateur: mockUsers[0],
    dateValidation: new Date('2024-01-05T10:00:00'),
    commentaire: "Salaire mensuel",
    dateCreation: new Date('2024-01-05T09:30:00')
  },
  {
    id: 2,
    libelle: "Facture d'électricité décembre",
    categorie: DepenseCategorie.ELECTRICITE,
    montant: 75000,
    statut: DepenseStatut.VALIDATED,
    utilisateurId: 3,
    utilisateur: mockUsers[2],
    validateurId: 1,
    validateur: mockUsers[0],
    dateValidation: new Date('2024-01-07T14:15:00'),
    commentaire: "Facture Eneo",
    dateCreation: new Date('2024-01-07T13:45:00')
  },
  {
    id: 3,
    libelle: "Abonnement internet janvier",
    categorie: DepenseCategorie.INTERNET,
    montant: 50000,
    statut: DepenseStatut.VALIDATED,
    utilisateurId: 4,
    utilisateur: mockUsers[3],
    validateurId: 2,
    validateur: mockUsers[1],
    dateValidation: new Date('2024-01-08T11:20:00'),
    commentaire: "Abonnement CAMTEL",
    dateCreation: new Date('2024-01-08T10:50:00')
  },
  {
    id: 4,
    libelle: "Loyer bureau janvier",
    categorie: DepenseCategorie.LOYER,
    montant: 300000,
    statut: DepenseStatut.VALIDATED,
    utilisateurId: 2,
    utilisateur: mockUsers[1],
    validateurId: 1,
    validateur: mockUsers[0],
    dateValidation: new Date('2024-01-10T16:30:00'),
    commentaire: "Loyer mensuel",
    dateCreation: new Date('2024-01-10T16:00:00')
  },
  {
    id: 5,
    libelle: "Achat fournitures bureau",
    categorie: DepenseCategorie.FOURNITURE,
    montant: 45000,
    statut: DepenseStatut.PENDING,
    utilisateurId: 3,
    utilisateur: mockUsers[2],
    commentaire: "Papier, stylos, enveloppes",
    dateCreation: new Date('2024-01-12T09:15:00')
  },
  {
    id: 6,
    libelle: "Maintenance ordinateurs",
    categorie: DepenseCategorie.MAINTENANCE,
    montant: 120000,
    statut: DepenseStatut.PENDING,
    utilisateurId: 4,
    utilisateur: mockUsers[3],
    commentaire: "Réparation 2 ordinateurs",
    dateCreation: new Date('2024-01-13T14:45:00')
  },
  {
    id: 7,
    libelle: "Carburant véhicule service",
    categorie: DepenseCategorie.TRANSPORT,
    montant: 35000,
    statut: DepenseStatut.VALIDATED,
    utilisateurId: 2,
    utilisateur: mockUsers[1],
    validateurId: 1,
    validateur: mockUsers[0],
    dateValidation: new Date('2024-01-14T11:10:00'),
    commentaire: "Plein essence",
    dateCreation: new Date('2024-01-14T10:40:00')
  },
  {
    id: 8,
    libelle: "Frais de formation employés",
    categorie: DepenseCategorie.AUTRE,
    montant: 150000,
    statut: DepenseStatut.REJECTED,
    utilisateurId: 3,
    utilisateur: mockUsers[2],
    validateurId: 1,
    validateur: mockUsers[0],
    dateValidation: new Date('2024-01-15T15:20:00'),
    commentaire: "Formation reportée au mois prochain",
    dateCreation: new Date('2024-01-15T14:50:00')
  }
];

export const mockExpensesStats: DepenseStats = {
  totalDepenses: 1075000,
  depensesParCategorie: [
    { categorie: DepenseCategorie.SALAIRE, total: 450000, pourcentage: 41.86 },
    { categorie: DepenseCategorie.LOYER, total: 300000, pourcentage: 27.91 },
    { categorie: DepenseCategorie.MAINTENANCE, total: 120000, pourcentage: 11.16 },
    { categorie: DepenseCategorie.AUTRE, total: 150000, pourcentage: 13.95 },
    { categorie: DepenseCategorie.ELECTRICITE, total: 75000, pourcentage: 6.98 },
    { categorie: DepenseCategorie.INTERNET, total: 50000, pourcentage: 4.65 },
    { categorie: DepenseCategorie.TRANSPORT, total: 35000, pourcentage: 3.26 },
    { categorie: DepenseCategorie.FOURNITURE, total: 45000, pourcentage: 4.19 }
  ],
  depensesEnAttente: 165000,
  moyenneMensuelle: 850000
};