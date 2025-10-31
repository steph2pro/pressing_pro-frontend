import { UserRole } from '../data/models/users';
import {AdminRole } from '../data/models/admin';

export const isAdminRole = (role: UserRole): role is AdminRole => {
  return [UserRole.ADMIN, UserRole.DIRECTOR, UserRole.MANAGER].includes(role);
};

export const getAdminRoleDisplayName = (role: AdminRole): string => {
  const roleNames: Record<AdminRole, string> = {
    [UserRole.ADMIN]: 'Administrateur',
    [UserRole.DIRECTOR]: 'Directeur',
    [UserRole.MANAGER]: 'Manager'
  };
  
  return roleNames[role] || role;
};

export const getActionDisplayName = (action: string): string => {
  const actionNames: Record<string, string> = {
    'CONNEXION': 'Connexion',
    'DECONNEXION': 'Déconnexion',
    'CREATION': 'Création',
    'MODIFICATION': 'Modification',
    'SUPPRESSION': 'Suppression',
    'EXPORT': 'Export',
    'IMPORT': 'Import',
    'VALIDATION': 'Validation',
    'REJECTION': 'Rejet'
  };
  
  return actionNames[action] || action;
};

export const getModuleDisplayName = (module: string): string => {
  const moduleNames: Record<string, string> = {
    'Authentification': 'Authentification',
    'Gestion des utilisateurs': 'Utilisateurs',
    'Gestion des produits': 'Produits',
    'Gestion des catégories': 'Catégories',
    'Gestion des stocks': 'Stocks',
    'Gestion des ventes': 'Ventes',
    'Rapports': 'Rapports',
    'Paramètres système': 'Paramètres',
    'Gestion des rôles': 'Rôles'
  };
  
  return moduleNames[module] || module;
};

export const getActionBadgeVariant = (action: string): 'success' | 'warning' | 'error' | 'info' | 'default' => {
  switch (action) {
    case 'CONNEXION':
    case 'CREATION':
    case 'VALIDATION':
      return 'success';
    case 'MODIFICATION':
    case 'IMPORT':
      return 'warning';
    case 'SUPPRESSION':
    case 'REJECTION':
      return 'error';
    case 'EXPORT':
    case 'DECONNEXION':
      return 'info';
    default:
      return 'default';
  }
};