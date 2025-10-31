// =============================================
// TYPES POUR LA GESTION DES RÔLES ET PERMISSIONS
// =============================================

import { UserRole } from "./users";

export interface Role {
  id: number;
  nom: string;
  code: UserRole;
  description: string;
  permissions: string[];
  utilisateursCount: number;
  dateCreation: Date;
  dateModification?: Date;
}

export interface CreateRoleRequest {
  nom: string;
  code: UserRole;
  description: string;
  permissions: string[];
}

export interface UpdateRoleRequest {
  nom?: string;
  description?: string;
  permissions?: string[];
}

export interface RoleListResponse {
  data: Role[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface RoleResponse {
  data: Role;
}

export interface RoleSearchParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}