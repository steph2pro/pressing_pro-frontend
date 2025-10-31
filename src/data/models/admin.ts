// =============================================
// TYPES POUR LA GESTION DES ADMINISTRATEURS
// =============================================

import { User, UserRole } from "./users";

export interface AdminStatistics {
  totalAdmins: number;
  activeAdmins: number;
  inactiveAdmins: number;
  superAdmins: number;
  adminsByRole: Array<{
    role: UserRole;
    count: number;
    percentage: number;
  }>;
  recentActivity: Array<{
    admin: User;
    action: string;
    timestamp: Date;
    details?: string;
  }>;
  permissionUsage: Array<{
    permission: string;
    count: number;
    percentage: number;
  }>;
}

export interface AdminActivity {
  id: number;
  adminId: number;
  admin: User;
  action: string;
  module: string;
  details?: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}

export interface AdminActivitySearchParams {
  page?: number;
  limit?: number;
  adminId?: number;
  action?: string;
  module?: string;
  dateDebut?: Date;
  dateFin?: Date;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface AdminActivityListResponse {
  data: AdminActivity[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

// Types spécifiques pour les administrateurs
export type AdminRole = UserRole.ADMIN | UserRole.DIRECTOR | UserRole.MANAGER;