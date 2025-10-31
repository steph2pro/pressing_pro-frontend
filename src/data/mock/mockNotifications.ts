import { UserRole } from '../models';
import { Notification, TypeAlerte, StatutNotification, PrioriteAlerte, UnreadCountResponse, ConfigurationAlerte } from '../models/notifications';

export const mockNotifications: Notification[] = [
  {
    id: 1,
    type: TypeAlerte.STOCK_FAIBLE,
    titre: "Stock faible - Visa USA Touristique",
    message: "Le stock de Visa USA Touristique est critique (2 unités restantes)",
    statut: StatutNotification.NON_LU,
    priorite: PrioriteAlerte.URGENTE,
    utilisateurId: 1,
    lien: "/products",
    donnees: { produitId: 9, quantite: 2, seuil: 2 },
    dateCreation: new Date('2024-01-15T08:00:00')
  },
  {
    id: 2,
    type: TypeAlerte.STOCK_FAIBLE,
    titre: "Stock faible - Excursion Mont Cameroun",
    message: "Le stock d'Excursion Mont Cameroun est faible (3 unités restantes)",
    statut: StatutNotification.NON_LU,
    priorite: PrioriteAlerte.HAUTE,
    utilisateurId: 1,
    lien: "/products",
    donnees: { produitId: 6, quantite: 3, seuil: 2 },
    dateCreation: new Date('2024-01-15T08:30:00')
  },
  {
    id: 3,
    type: TypeAlerte.VENTE_EXCEPTIONNELLE,
    titre: "Vente exceptionnelle détectée",
    message: "Une vente de 1,900,000 FCFA a été enregistrée par Alice Mbappe",
    statut: StatutNotification.NON_LU,
    priorite: PrioriteAlerte.MOYENNE,
    utilisateurId: 1,
    lien: "/sales/3",
    donnees: { venteId: 3, montant: 1900000, utilisateur: "Alice Mbappe" },
    dateCreation: new Date('2024-01-14T15:00:00')
  },
  {
    id: 4,
    type: TypeAlerte.DEPENSE_ELEVEE,
    titre: "Dépense élevée en attente",
    message: "Une dépense de 450,000 FCFA pour les fournitures bureau est en attente de validation",
    statut: StatutNotification.NON_LU,
    priorite: PrioriteAlerte.HAUTE,
    utilisateurId: 1,
    lien: "/expenses/5",
    donnees: { depenseId: 5, montant: 450000, categorie: "fourniture" },
    dateCreation: new Date('2024-01-13T09:30:00')
  },
  {
    id: 5,
    type: TypeAlerte.APPROVISIONNEMENT_RETARD,
    titre: "Approvisionnement en retard",
    message: "L'approvisionnement #5 de AXA Cameroun est en statut brouillon depuis 2 jours",
    statut: StatutNotification.LU,
    priorite: PrioriteAlerte.BASSE,
    utilisateurId: 1,
    lien: "/supplies/5",
    donnees: { approvisionnementId: 5, fournisseur: "AXA Cameroun", joursRetard: 2 },
    dateCreation: new Date('2024-01-13T10:00:00'),
    dateLecture: new Date('2024-01-13T14:00:00')
  },
  {
    id: 6,
    type: TypeAlerte.SECURITE,
    titre: "Nouvelle connexion détectée",
    message: "Connexion de Jean Kamga depuis un nouvel appareil",
    statut: StatutNotification.LU,
    priorite: PrioriteAlerte.MOYENNE,
    utilisateurId: 1,
    lien: "/audit",
    donnees: { utilisateur: "Jean Kamga", ip: "192.168.1.101", appareil: "Macintosh" },
    dateCreation: new Date('2024-01-12T11:15:00'),
    dateLecture: new Date('2024-01-12T12:30:00')
  },
  {
    id: 7,
    type: TypeAlerte.INVENTAIRE,
    titre: "Inventaire mensuel requis",
    message: "L'inventaire mensuel doit être effectué avant la fin de la semaine",
    statut: StatutNotification.NON_LU,
    priorite: PrioriteAlerte.MOYENNE,
    utilisateurId: 1,
    lien: "/inventory",
    donnees: { echeance: "2024-01-19", type: "mensuel" },
    dateCreation: new Date('2024-01-10T09:00:00')
  },
  {
    id: 8,
    type: TypeAlerte.MAINTENANCE,
    titre: "Maintenance système planifiée",
    message: "Une maintenance système est planifiée pour samedi 20 janvier de 22h à 02h",
    statut: StatutNotification.LU,
    priorite: PrioriteAlerte.BASSE,
    utilisateurId: 1,
    lien: "/settings",
    donnees: { date: "2024-01-20", heureDebut: "22:00", heureFin: "02:00" },
    dateCreation: new Date('2024-01-09T14:00:00'),
    dateLecture: new Date('2024-01-09T15:30:00')
  }
];

export const mockUnreadCount: UnreadCountResponse = {
  data: {
    total: 4,
    parPriorite: {
      urgente: 1,
      haute: 2,
      moyenne: 1,
      basse: 0
    }
  }
};

export const mockAlertConfigurations: ConfigurationAlerte[] = [
  {
    id: 1,
    type: TypeAlerte.STOCK_FAIBLE,
    active: true,
    seuil: 5,
    destinataires: [UserRole.ADMIN, UserRole.DIRECTOR, UserRole.MANAGER],
    notificationEmail: true,
    notificationSystem: true,
    canaux: 'email,system',
    dateCreation: new Date('2024-01-01T08:00:00')
  },
  {
    id: 2,
    type: TypeAlerte.VENTE_EXCEPTIONNELLE,
    active: true,
    seuil: 1000000,
    destinataires: [UserRole.ADMIN, UserRole.DIRECTOR],
    notificationEmail: false,
    notificationSystem: true,
    canaux: 'system',
    dateCreation: new Date('2024-01-01T08:00:00')
  },
  {
    id: 3,
    type: TypeAlerte.DEPENSE_ELEVEE,
    active: true,
    seuil: 300000,
    destinataires: [UserRole.ADMIN, UserRole.DIRECTOR],
    notificationEmail: true,
    notificationSystem: true,
    canaux: 'email,system',
    dateCreation: new Date('2024-01-01T08:00:00')
  },
  {
    id: 4,
    type: TypeAlerte.APPROVISIONNEMENT_RETARD,
    active: true,
    seuil: 2,
    destinataires: [UserRole.ADMIN, UserRole.MANAGER],
    notificationEmail: false,
    notificationSystem: true,
    canaux: 'system',
    dateCreation: new Date('2024-01-01T08:00:00')
  },
  {
    id: 5,
    type: TypeAlerte.SECURITE,
    active: true,
    destinataires: [UserRole.ADMIN],
    notificationEmail: true,
    notificationSystem: true,
    canaux: 'email,system',
    dateCreation: new Date('2024-01-01T08:00:00')
  }
];
