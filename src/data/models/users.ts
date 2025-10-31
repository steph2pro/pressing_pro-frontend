// =============================================
// TYPES POUR LA GESTION DES UTILISATEURS ET AUTH
// =============================================

export enum UserRole {
  ADMIN = 'admin',
  DIRECTOR = 'director',
  MANAGER = 'manager',
  CASHIER = 'cashier',
  EMPLOYEE = 'employee'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended'
}

export interface User {
  id: number;
  nom: string;
  email: string;
  motDePasse?: string;
  role: UserRole;
  statut: UserStatus;
  telephone?: string;
  lastLogin?: Date;
  dateCreation: Date;
  dateModification?: Date;
}

// PERMISSIONS
export interface Permission {
  id: number;
  nom: string;
  code: string;
  description: string;
}

export interface RolePermissions {
  role: UserRole;
  permissions: string[];
}

// AUTHENTIFICATION
export interface LoginRequest {
  email: string;
  motDePasse: string;
}

export interface LoginResponse {
  data: {
    user: User;
    token: string;
    refreshToken: string;
    expiresIn: number;
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// GESTION UTILISATEURS
export interface CreateUserRequest {
  nom: string;
  email: string;
  motDePasse: string;
  role: UserRole;
  telephone?: string;
}

export interface UpdateUserRequest {
  nom?: string;
  email?: string;
  role?: UserRole;
  statut?: UserStatus;
  telephone?: string;
}

export interface UpdateProfileRequest {
  nom?: string;
  email?: string;
  telephone?: string;
}

// FILTRES
export interface UserSearchParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  role?: UserRole;
  statut?: UserStatus;
}

// RÉPONSES
export interface UserListResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface UserResponse {
  data: User;
}

// STATISTIQUES
export interface UserStatistics {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  suspendedUsers: number;
  newUsersThisMonth: number;
  roleDistribution: Array<{
    role: UserRole;
    count: number;
    percentage: number;
  }>;
  monthlyActivity: Array<{
    month: string;
    logins: number;
    newUsers: number;
  }>;
}