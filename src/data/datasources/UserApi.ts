import { AxiosResponse } from 'axios';
import { 
  User, 
  UserStatistics,
  CreateUserRequest,
  UpdateUserRequest,
  UserListResponse,
  UserSearchParams,
  LoginRequest,
  LoginResponse,
  ChangePasswordRequest,
  UpdateProfileRequest,
  Permission,
  RolePermissions,
  UserStatus,
  UserRole
} from '../models/users';
import api from './Api';
import { API_ENDPOINTS } from '../../utils/const';
import { 
  mockUsers, 
  mockUserStatistics,
  mockPermissions,
  mockRolePermissions,
  mockRoles
} from '../mock/mockUsers';
import { CreateRoleRequest, Role, RoleListResponse, RoleSearchParams, UpdateRoleRequest } from '../models/roles';

export default class UserApi {
  private useMocks: boolean = true;

  /**
   * Récupère la liste paginée des utilisateurs
   */
  async getUsers(params?: UserSearchParams): Promise<UserListResponse> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filteredUsers = [...mockUsers];
      
      // Appliquer les filtres
      if (params?.search) {
        const searchLower = params.search.toLowerCase();
        filteredUsers = filteredUsers.filter(user => 
          user.nom.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
        );
      }
      
      if (params?.role) {
        filteredUsers = filteredUsers.filter(user => user.role === params.role);
      }
      
      if (params?.statut) {
        filteredUsers = filteredUsers.filter(user => user.statut === params.statut);
      }
      
      // Pagination
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
      
      return {
        data: paginatedUsers,
        total: filteredUsers.length,
        page,
        limit,
        pages: Math.ceil(filteredUsers.length / limit)
      };
    }

    const response: AxiosResponse<UserListResponse> = await api.get(API_ENDPOINTS.USERS, { params });
    return response.data;
  }

  /**
   * Récupère un utilisateur par son ID
   */
  async getUserById(id: number): Promise<User> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const user = mockUsers.find(u => u.id === id);
      if (!user) {
        throw new Error('Utilisateur non trouvé');
      }
      
      return user;
    }

    const response: AxiosResponse<User> = await api.get(`${API_ENDPOINTS.USERS}/${id}`);
    return response.data;
  }

  /**
   * Crée un nouvel utilisateur
   */
  async createUser(payload: CreateUserRequest): Promise<User> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Math.max(...mockUsers.map(u => u.id)) + 1,
        nom: payload.nom,
        email: payload.email,
        role: payload.role,
        statut: UserStatus.ACTIVE,
        telephone: payload.telephone,
        dateCreation: new Date()
      };
      
      return newUser;
    }

    const response: AxiosResponse<User> = await api.post(API_ENDPOINTS.USERS, payload);
    return response.data;
  }

  /**
   * Met à jour un utilisateur
   */
  async updateUser(id: number, payload: UpdateUserRequest): Promise<User> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const userIndex = mockUsers.findIndex(u => u.id === id);
      if (userIndex === -1) {
        throw new Error('Utilisateur non trouvé');
      }
      
      const updatedUser = {
        ...mockUsers[userIndex],
        ...payload,
        dateModification: new Date()
      };
      
      return updatedUser;
    }

    const response: AxiosResponse<User> = await api.put(`${API_ENDPOINTS.USERS}/${id}`, payload);
    return response.data;
  }

  /**
   * Supprime un utilisateur
   */
  async deleteUser(id: number): Promise<void> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const userIndex = mockUsers.findIndex(u => u.id === id);
      if (userIndex === -1) {
        throw new Error('Utilisateur non trouvé');
      }
      
      return;
    }

    await api.delete(`${API_ENDPOINTS.USERS}/${id}`);
  }

  /**
   * Authentifie un utilisateur
   */
  async login(payload: LoginRequest): Promise<LoginResponse> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = mockUsers.find(u => u.email === payload.email);
      if (!user) {
        throw new Error('Email ou mot de passe incorrect');
      }
      
      return {
        data: {
          user,
          token: 'mock-jwt-token',
          refreshToken: 'mock-refresh-token',
          expiresIn: 3600
        }
      };
    }

    const response: AxiosResponse<LoginResponse> = await api.post(API_ENDPOINTS.LOGIN, payload);
    return response.data;
  }

  /**
   * Met à jour le profil de l'utilisateur connecté
   */
  async updateProfile(payload: UpdateProfileRequest): Promise<User> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Simuler la mise à jour du premier utilisateur (connecté)
      const updatedUser = {
        ...mockUsers[0],
        ...payload,
        dateModification: new Date()
      };
      
      return updatedUser;
    }

    const response: AxiosResponse<User> = await api.put(API_ENDPOINTS.UPDATE_PROFILE, payload);
    return response.data;
  }

  /**
   * Change le mot de passe de l'utilisateur connecté
   */
  async changePassword(payload: ChangePasswordRequest): Promise<void> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (payload.newPassword !== payload.confirmPassword) {
        throw new Error('Les mots de passe ne correspondent pas');
      }
      
      return;
    }

    await api.put(API_ENDPOINTS.CHANGE_PASSWORD, payload);
  }

  /**
   * Récupère les statistiques des utilisateurs
   */
  async getUserStatistics(): Promise<UserStatistics> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 700));
      return mockUserStatistics;
    }

    const response: AxiosResponse<UserStatistics> = await api.get(`${API_ENDPOINTS.USERS}/statistics`);
    return response.data;
  }

  /**
   * Récupère toutes les permissions disponibles
   */
  async getPermissions(): Promise<Permission[]> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockPermissions;
    }

    const response: AxiosResponse<Permission[]> = await api.get(API_ENDPOINTS.PERMISSIONS);
    return response.data;
  }

  /**
   * Récupère les permissions par rôle
   */
  async getRolePermissions(): Promise<RolePermissions[]> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockRolePermissions;
    }

    const response: AxiosResponse<RolePermissions[]> = await api.get(API_ENDPOINTS.ROLE_PERMISSIONS);
    return response.data;
  }

    /**
   * Récupère la liste paginée des rôles
   */
  async getRoles(params?: RoleSearchParams): Promise<RoleListResponse> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      let filteredRoles = [...mockRoles];
      
      if (params?.search) {
        const searchLower = params.search.toLowerCase();
        filteredRoles = filteredRoles.filter(role => 
          role.nom.toLowerCase().includes(searchLower) ||
          role.description.toLowerCase().includes(searchLower)
        );
      }
      
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedRoles = filteredRoles.slice(startIndex, endIndex);
      
      return {
        data: paginatedRoles,
        total: filteredRoles.length,
        page,
        limit,
        pages: Math.ceil(filteredRoles.length / limit)
      };
    }

    const response: AxiosResponse<RoleListResponse> = await api.get(API_ENDPOINTS.ROLES, { params });
    return response.data;
  }

  /**
   * Récupère un rôle par son ID
   */
  async getRoleById(id: number): Promise<Role> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const role = mockRoles.find(r => r.id === id);
      if (!role) {
        throw new Error('Rôle non trouvé');
      }
      
      return role;
    }

    const response: AxiosResponse<Role> = await api.get(`${API_ENDPOINTS.ROLES}/${id}`);
    return response.data;
  }

  /**
   * Crée un nouveau rôle
   */
  async createRole(payload: CreateRoleRequest): Promise<Role> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Vérifier si le code de rôle existe déjà
      const existingRole = mockRoles.find(r => r.code === payload.code);
      if (existingRole) {
        throw new Error('Un rôle avec ce code existe déjà');
      }
      
      const newRole: Role = {
        id: Math.max(...mockRoles.map(r => r.id)) + 1,
        nom: payload.nom,
        code: payload.code,
        description: payload.description,
        permissions: payload.permissions,
        utilisateursCount: 0,
        dateCreation: new Date()
      };
      
      return newRole;
    }

    const response: AxiosResponse<Role> = await api.post(API_ENDPOINTS.ROLES, payload);
    return response.data;
  }

  /**
   * Met à jour un rôle
   */
  async updateRole(id: number, payload: UpdateRoleRequest): Promise<Role> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 700));
      
      const roleIndex = mockRoles.findIndex(r => r.id === id);
      if (roleIndex === -1) {
        throw new Error('Rôle non trouvé');
      }
      
      const updatedRole = {
        ...mockRoles[roleIndex],
        ...payload,
        dateModification: new Date()
      };
      
      return updatedRole;
    }

    const response: AxiosResponse<Role> = await api.put(`${API_ENDPOINTS.ROLES}/${id}`, payload);
    return response.data;
  }

  /**
   * Supprime un rôle
   */
  async deleteRole(id: number): Promise<void> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const roleIndex = mockRoles.findIndex(r => r.id === id);
      if (roleIndex === -1) {
        throw new Error('Rôle non trouvé');
      }
      
      // Vérifier si le rôle est utilisé par des utilisateurs
      const usersWithRole = mockUsers.filter(u => u.role === mockRoles[roleIndex].code);
      if (usersWithRole.length > 0) {
        throw new Error('Impossible de supprimer un rôle associé à des utilisateurs');
      }
      
      // Vérifier s'il s'agit d'un rôle système
      const systemRoles = [UserRole.ADMIN, UserRole.DIRECTOR, UserRole.MANAGER, UserRole.CASHIER, UserRole.EMPLOYEE];
      if (systemRoles.includes(mockRoles[roleIndex].code)) {
        throw new Error('Impossible de supprimer un rôle système');
      }
      
      return;
    }

    await api.delete(`${API_ENDPOINTS.ROLES}/${id}`);
  }

  /**
   * Récupère les statistiques d'utilisation des rôles
   */
  async getRoleStatistics(): Promise<any> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const roleStats = mockRoles.map(role => ({
        role: role.nom,
        code: role.code,
        userCount: role.utilisateursCount,
        permissionsCount: role.permissions.length,
        lastActivity: new Date()
      }));
      
      return {
        totalRoles: mockRoles.length,
        totalPermissions: mockPermissions.length,
        roleUsage: roleStats,
        mostUsedPermissions: this.getMostUsedPermissions()
      };
    }

    const response: AxiosResponse<any> = await api.get(`${API_ENDPOINTS.ROLES}/statistics`);
    return response.data;
  }

  private getMostUsedPermissions(): any[] {
    const permissionUsage: Record<string, number> = {};
    
    mockRoles.forEach(role => {
      role.permissions.forEach(permission => {
        permissionUsage[permission] = (permissionUsage[permission] || 0) + 1;
      });
    });
    
    return Object.entries(permissionUsage)
      .map(([permission, count]) => ({
        permission,
        count,
        percentage: (count / mockRoles.length) * 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  
}