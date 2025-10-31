import { Transaction, TransactionType, TransactionStatut, Solde, MouvementTresorerie } from '../models/transactions';
import { mockUsers } from './mockUsers';

export const mockTransactions: Transaction[] = [
  {
    id: 1,
    type: TransactionType.DEPOT,
    montant: 2000000,
    statut: TransactionStatut.VALIDATED,
    utilisateurId: 4,
    utilisateur: mockUsers[3],
    validateurId: 1,
    validateur: mockUsers[0],
    dateOperation: new Date('2024-01-15T08:00:00'),
    dateValidation: new Date('2024-01-15T08:05:00'),
    motif: "Dépôt caisse initial",
    commentaire: "Fond de caisse",
    dateCreation: new Date('2024-01-15T08:00:00')
  },
  {
    id: 2,
    type: TransactionType.RETRAIT,
    montant: 450000,
    statut: TransactionStatut.VALIDATED,
    utilisateurId: 2,
    utilisateur: mockUsers[1],
    validateurId: 1,
    validateur: mockUsers[0],
    dateOperation: new Date('2024-01-15T10:30:00'),
    dateValidation: new Date('2024-01-15T10:35:00'),
    motif: "Paiement salaire",
    commentaire: "Salaire Marie Dupont",
    dateCreation: new Date('2024-01-15T10:30:00')
  },
  {
    id: 3,
    type: TransactionType.RETRAIT,
    montant: 75000,
    statut: TransactionStatut.VALIDATED,
    utilisateurId: 3,
    utilisateur: mockUsers[2],
    validateurId: 1,
    validateur: mockUsers[0],
    dateOperation: new Date('2024-01-14T14:00:00'),
    dateValidation: new Date('2024-01-14T14:05:00'),
    motif: "Paiement facture",
    commentaire: "Facture électricité",
    dateCreation: new Date('2024-01-14T14:00:00')
  },
  {
    id: 4,
    type: TransactionType.DEPOT,
    montant: 500000,
    statut: TransactionStatut.VALIDATED,
    utilisateurId: 4,
    utilisateur: mockUsers[3],
    validateurId: 2,
    validateur: mockUsers[1],
    dateOperation: new Date('2024-01-14T16:45:00'),
    dateValidation: new Date('2024-01-14T16:50:00'),
    motif: "Dépôt recettes",
    commentaire: "Recettes journée",
    dateCreation: new Date('2024-01-14T16:45:00')
  },
  {
    id: 5,
    type: TransactionType.RETRAIT,
    montant: 300000,
    statut: TransactionStatut.VALIDATED,
    utilisateurId: 2,
    utilisateur: mockUsers[1],
    validateurId: 1,
    validateur: mockUsers[0],
    dateOperation: new Date('2024-01-13T09:15:00'),
    dateValidation: new Date('2024-01-13T09:20:00'),
    motif: "Paiement loyer",
    commentaire: "Loyer bureau",
    dateCreation: new Date('2024-01-13T09:15:00')
  },
  {
    id: 6,
    type: TransactionType.DEPOT,
    montant: 1200000,
    statut: TransactionStatut.PENDING,
    utilisateurId: 4,
    utilisateur: mockUsers[3],
    dateOperation: new Date('2024-01-13T15:30:00'),
    motif: "Dépôt recettes",
    commentaire: "Recettes weekend",
    dateCreation: new Date('2024-01-13T15:30:00')
  },
  {
    id: 7,
    type: TransactionType.RETRAIT,
    montant: 200000,
    statut: TransactionStatut.PENDING,
    utilisateurId: 3,
    utilisateur: mockUsers[2],
    dateOperation: new Date('2024-01-12T11:00:00'),
    motif: "Achat matériel",
    commentaire: "Matériel informatique",
    dateCreation: new Date('2024-01-12T11:00:00')
  },
  {
    id: 8,
    type: TransactionType.DEPOT,
    montant: 800000,
    statut: TransactionStatut.CANCELLED,
    utilisateurId: 4,
    utilisateur: mockUsers[3],
    validateurId: 1,
    validateur: mockUsers[0],
    dateOperation: new Date('2024-01-12T17:20:00'),
    dateValidation: new Date('2024-01-12T17:25:00'),
    motif: "Dépôt recettes",
    commentaire: "Annulé - erreur de montant",
    dateCreation: new Date('2024-01-12T17:20:00')
  }
];

export const mockBalance: Solde = {
  soldeDisponible: 2825000,
  soldeEnAttente: 1400000,
  totalDepots: 4500000,
  totalRetraits: 1675000,
  dateMiseAJour: new Date('2024-01-15T17:00:00')
};

export const mockMouvementsTresorerie: MouvementTresorerie[] = [
  { date: new Date('2024-01-15'), type: 'vente', libelle: "Vente billets", montant: 120000, solde: 2945000 },
  { date: new Date('2024-01-15'), type: 'depense', libelle: "Fournitures", montant: -45000, solde: 2900000 },
  { date: new Date('2024-01-14'), type: 'vente', libelle: "Vente hôtel", montant: 195000, solde: 2945000 },
  { date: new Date('2024-01-14'), type: 'depot', libelle: "Dépôt recettes", montant: 500000, solde: 2750000 },
  { date: new Date('2024-01-13'), type: 'retrait', libelle: "Paiement loyer", montant: -300000, solde: 2250000 },
  { date: new Date('2024-01-13'), type: 'vente', libelle: "Vente assurances", montant: 75000, solde: 2550000 }
];