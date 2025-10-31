import { Role } from '../data/models/roles';
import { UserRole, UserStatus } from '../data/models/users';


export const hasPermission = (userRole: UserRole, requiredPermission: string): boolean => {
  const rolePermissions: Record<UserRole, string[]> = {
    [UserRole.ADMIN]: [
      'user:read', 'user:write', 'user:delete',
      'product:read', 'product:write', 'product:delete',
      'category:read', 'category:write', 'category:delete',
      'stock:read', 'stock:write', 'stock:delete',
      'sale:read', 'sale:write', 'sale:delete',
      'report:read', 'report:write', 'report:export',
      'finance:read', 'finance:write',
      'role:manage'
    ],
    [UserRole.DIRECTOR]: [
      'user:read', 'user:write',
      'product:read', 'product:write', 'product:delete',
      'category:read', 'category:write',
      'stock:read', 'stock:write',
      'sale:read', 'sale:write',
      'report:read', 'report:export',
      'finance:read'
    ],
    [UserRole.MANAGER]: [
      'product:read', 'product:write',
      'category:read', 'category:write',
      'stock:read', 'stock:write',
      'sale:read', 'sale:write',
      'report:read', 'report:export'
    ],
    [UserRole.CASHIER]: [
      'product:read',
      'stock:read',
      'sale:read', 'sale:write'
    ],
    [UserRole.EMPLOYEE]: [
      'product:read',
      'sale:read'
    ]
  };

  return rolePermissions[userRole]?.includes(requiredPermission) || false;
};

export const getRoleDisplayName = (role: UserRole): string => {
  const roleNames: Record<UserRole, string> = {
    [UserRole.ADMIN]: 'Administrateur',
    [UserRole.DIRECTOR]: 'Directeur',
    [UserRole.MANAGER]: 'Manager',
    [UserRole.CASHIER]: 'Caissier',
    [UserRole.EMPLOYEE]: 'Employé'
  };
  
  return roleNames[role] || role;
};

export const getStatusDisplayName = (status: string): string => {
  const statusNames: Record<string, string> = {
    'active': 'Actif',
    'inactive': 'Inactif',
    'suspended': 'Suspendu'
  };
  
  return statusNames[status] || status;
};

export const getAvailableRoleCodes = (existingRoles: Role[]): UserRole[] => {
  const usedCodes = existingRoles.map(role => role.code);
  return Object.values(UserRole).filter(code => !usedCodes.includes(code));
};

export const validateRolePermissions = (permissions: string[], allPermissions: string[]): boolean => {
  return permissions.every(permission => allPermissions.includes(permission));
};

export const getPermissionCategories = (permissions: string[]): Record<string, string[]> => {
  const categories: Record<string, string[]> = {};
  
  permissions.forEach(permission => {
    const [category] = permission.split(':');
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(permission);
  });
  
  return categories;
};

export const getRolePermissionsSummary = (role: Role): { total: number; categories: Record<string, number> } => {
  const categories: Record<string, number> = {};
  
  role.permissions.forEach(permission => {
    const [category] = permission.split(':');
    categories[category] = (categories[category] || 0) + 1;
  });
  
  return {
    total: role.permissions.length,
    categories
  };
};
// ... fonctions existantes ...

export const getStatusBadgeVariant = (statut: UserStatus): 'success' | 'warning' | 'error' | 'default' => {
  switch (statut) {
    case UserStatus.ACTIVE: return 'success'
    case UserStatus.INACTIVE: return 'warning'
    case UserStatus.SUSPENDED: return 'error'
    default: return 'default'
  }
}

export const getRoleBadgeVariant = (role: UserRole): 'error' | 'warning' | 'info' | 'success' | 'default' => {
  switch (role) {
    case UserRole.ADMIN: return 'error'
    case UserRole.DIRECTOR: return 'warning'
    case UserRole.MANAGER: return 'info'
    case UserRole.CASHIER: return 'success'
    case UserRole.EMPLOYEE: return 'default'
    default: return 'default'
  }
}
// ... fonctions existantes ...

export const getPermissionCoverage = (rolePermissions: string[], allPermissions: string[]): number => {
  if (allPermissions.length === 0) return 0
  return (rolePermissions.length / allPermissions.length) * 100
}

export const getRoleCapabilities = (rolePermissions: string[]) => {
  const capabilities = {
    read: ['user:read', 'product:read', 'category:read', 'stock:read', 'sale:read', 'report:read', 'finance:read'],
    write: ['user:write', 'product:write', 'category:write', 'stock:write', 'sale:write', 'report:write', 'finance:write'],
    admin: ['user:delete', 'product:delete', 'category:delete', 'stock:delete', 'sale:delete', 'role:manage']
  }

  return {
    read: capabilities.read.filter(p => rolePermissions.includes(p)),
    write: capabilities.write.filter(p => rolePermissions.includes(p)),
    admin: capabilities.admin.filter(p => rolePermissions.includes(p))
  }
}