// =============================================
// TYPES POUR LES NOTIFICATIONS ET ALERTES
// =============================================

import { UserRole } from "./users";

export enum TypeAlerte {
  STOCK_FAIBLE = 'stock_faible',
  VENTE_EXCEPTIONNELLE = 'vente_exceptionnelle',
  DEPENSE_ELEVEE = 'depense_elevee',
  APPROVISIONNEMENT_RETARD = 'approvisionnement_retard',
  SECURITE = 'securite',
  INVENTAIRE = 'inventaire',
  MAINTENANCE = 'maintenance'
}

export enum StatutNotification {
  NON_LU = 'non_lu',
  LU = 'lu',
  ARCHIVE = 'archive'
}

export enum PrioriteAlerte {
  BASSE = 'basse',
  MOYENNE = 'moyenne',
  HAUTE = 'haute',
  URGENTE = 'urgente'
}

export interface Notification {
  id: number;
  type: TypeAlerte;
  titre: string;
  message: string;
  statut: StatutNotification;
  priorite: PrioriteAlerte;
  utilisateurId?: number;
  lien?: string;
  donnees?: any;
  dateCreation: Date;
  dateLecture?: Date;
}

// REQUÊTES
export interface UpdateNotificationRequest {
  statut: StatutNotification;
}

export interface MarkAllAsReadRequest {
  utilisateurId: number;
}

// FILTRES
export interface NotificationSearchParams {
  page?: number;
  limit?: number;
  type?: TypeAlerte;
  statut?: StatutNotification;
  priorite?: PrioriteAlerte;
  dateDebut?: Date;
  dateFin?: Date;
}

// RÉPONSES
export interface NotificationListResponse {
  data: Notification[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface NotificationResponse {
  data: Notification;
}

export interface UnreadCountResponse {
  data: {
    total: number;
    parPriorite: {
      urgente: number;
      haute: number;
      moyenne: number;
      basse: number;
    };
  };
}

// CONFIGURATION ALERTES
export interface ConfigurationAlerte {
  id: number;
  type: TypeAlerte;
  active: boolean;
  seuil?: number;
  destinataires: UserRole[];
  notificationEmail: boolean;
  notificationSystem: boolean;
  dateCreation: Date;
  dateModification?: Date;
  canaux:string
}