import { ActionLog, ModuleAction, TypeAction, RapportAudit } from '../models/audit';
import { mockUsers } from './mockUsers';

export const mockActionLogs: ActionLog[] = [
  {
    id: 1,
    utilisateurId: 4,
    utilisateur: mockUsers[3],
    action: TypeAction.CONNEXION,
    module: ModuleAction.AUTHENTIFICATION,
    description: "Connexion réussie",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    dateCreation: new Date('2024-01-15T08:00:00')
  },
  {
    id: 2,
    utilisateurId: 4,
    utilisateur: mockUsers[3],
    action: TypeAction.CREATION,
    module: ModuleAction.VENTE,
    description: "Création de la vente FAC-2024-001",
    anciennesValeurs: null,
    nouvellesValeurs: {
      client: "M. Roger Tchoupa",
      total: 100000,
      lignes: [
        { produit: "Billet Yaoundé-Douala", quantite: 1, prix: 35000 },
        { produit: "Hôtel Hilton Yaoundé", quantite: 1, prix: 65000 }
      ]
    },
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    dateCreation: new Date('2024-01-15T08:30:00')
  },
  {
    id: 3,
    utilisateurId: 3,
    utilisateur: mockUsers[2],
    action: TypeAction.CREATION,
    module: ModuleAction.VENTE,
    description: "Création de la vente FAC-2024-002",
    anciennesValeurs: null,
    nouvellesValeurs: {
      client: "Mme. Claire Ngo",
      total: 475000,
      lignes: [
        { produit: "Billet Douala-Paris", quantite: 1, prix: 450000 },
        { produit: "Assurance Voyage Gold", quantite: 1, prix: 25000 }
      ]
    },
    ipAddress: "192.168.1.101",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    dateCreation: new Date('2024-01-15T10:15:00')
  },
  {
    id: 4,
    utilisateurId: 1,
    utilisateur: mockUsers[0],
    action: TypeAction.VALIDATION,
    module: ModuleAction.DEPENSE,
    description: "Validation de la dépense #1 - Salaire Marie Dupont",
    anciennesValeurs: { statut: "pending" },
    nouvellesValeurs: { statut: "validated" },
    ipAddress: "192.168.1.102",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    dateCreation: new Date('2024-01-15T10:30:00')
  },
  {
    id: 5,
    utilisateurId: 2,
    utilisateur: mockUsers[1],
    action: TypeAction.CREATION,
    module: ModuleAction.APPROVISIONNEMENT,
    description: "Création approvisionnement #6 - Turkish Airlines",
    anciennesValeurs: null,
    nouvellesValeurs: {
      fournisseur: "Turkish Airlines",
      total: 7000000,
      lignes: [
        { produit: "Billet Douala-Istanbul", quantite: 25, prixAchat: 280000 }
      ]
    },
    ipAddress: "192.168.1.103",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    dateCreation: new Date('2024-01-15T11:00:00')
  },
  {
    id: 6,
    utilisateurId: 4,
    utilisateur: mockUsers[3],
    action: TypeAction.MODIFICATION,
    module: ModuleAction.PRODUIT,
    description: "Mise à jour du stock du produit Billet Yaoundé-Douala",
    anciennesValeurs: { quantite: 50 },
    nouvellesValeurs: { quantite: 49 },
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    dateCreation: new Date('2024-01-15T11:30:00')
  },
  {
    id: 7,
    utilisateurId: 1,
    utilisateur: mockUsers[0],
    action: TypeAction.LECTURE,
    module: ModuleAction.UTILISATEUR,
    description: "Consultation de la liste des utilisateurs",
    ipAddress: "192.168.1.102",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    dateCreation: new Date('2024-01-15T14:00:00')
  },
  {
    id: 8,
    utilisateurId: 3,
    utilisateur: mockUsers[2],
    action: TypeAction.REJET,
    module: ModuleAction.DEPENSE,
    description: "Rejet de la dépense #8 - Frais de formation",
    anciennesValeurs: { statut: "pending" },
    nouvellesValeurs: { statut: "rejected" },
    ipAddress: "192.168.1.101",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    dateCreation: new Date('2024-01-15T15:20:00')
  },
  {
    id: 9,
    utilisateurId: 4,
    utilisateur: mockUsers[3],
    action: TypeAction.DECONNEXION,
    module: ModuleAction.AUTHENTIFICATION,
    description: "Déconnexion de l'application",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    dateCreation: new Date('2024-01-15T17:00:00')
  },
  {
    id: 10,
    utilisateurId: 2,
    utilisateur: mockUsers[1],
    action: TypeAction.EXPORT,
    module: ModuleAction.REPORT,
    description: "Export du rapport des ventes",
    ipAddress: "192.168.1.103",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    dateCreation: new Date('2024-01-15T17:30:00')
  }
];

export const mockRapportAudit: RapportAudit = {
  periode: "2024-01-15",
  totalActions: 156,
  actionsParModule: [
    { module: ModuleAction.VENTE, count: 45 },
    { module: ModuleAction.AUTHENTIFICATION, count: 32 },
    { module: ModuleAction.PRODUIT, count: 28 },
    { module: ModuleAction.DEPENSE, count: 22 },
    { module: ModuleAction.APPROVISIONNEMENT, count: 15 },
    { module: ModuleAction.TRANSACTION, count: 8 },
    { module: ModuleAction.UTILISATEUR, count: 6 }
  ],
  actionsParUtilisateur: [
    { utilisateur: mockUsers[3], count: 48 },
    { utilisateur: mockUsers[2], count: 35 },
    { utilisateur: mockUsers[1], count: 32 },
    { utilisateur: mockUsers[0], count: 25 },
    { utilisateur: mockUsers[4], count: 16 }
  ],
  activiteQuotidienne: [
    { date: "2024-01-08", count: 18 },
    { date: "2024-01-09", count: 15 },
    { date: "2024-01-10", count: 22 },
    { date: "2024-01-11", count: 25 },
    { date: "2024-01-12", count: 20 },
    { date: "2024-01-13", count: 16 },
    { date: "2024-01-14", count: 19 },
    { date: "2024-01-15", count: 21 }
  ]
};