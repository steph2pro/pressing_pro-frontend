import { 
  AdminStatistics,
  AdminActivity 
} from '../models/admin';
import { 
  User, 
  UserRole
} from '../models/users';
import { mockUsers } from './mockUsers';

// Filtrer les utilisateurs avec des rôles d'administration
export const mockAdmins: User[] = mockUsers.filter(user => 
  [UserRole.ADMIN, UserRole.DIRECTOR, UserRole.MANAGER].includes(user.role)
);

export const mockAdminStatistics: AdminStatistics = {
  totalAdmins: 4,
  activeAdmins: 3,
  inactiveAdmins: 1,
  superAdmins: 1,
  adminsByRole: [
    { role: UserRole.ADMIN, count: 1, percentage: 25 },
    { role: UserRole.DIRECTOR, count: 1, percentage: 25 },
    { role: UserRole.MANAGER, count: 2, percentage: 50 }
  ],
  recentActivity: [
    {
      admin: mockUsers[0],
      action: 'CONNEXION',
      timestamp: new Date('2024-12-15T08:30:00'),
      details: 'Connexion réussie'
    },
    {
      admin: mockUsers[1],
      action: 'MODIFICATION',
      timestamp: new Date('2024-12-15T09:15:00'),
      details: 'Modification du produit #123'
    },
    {
      admin: mockUsers[2],
      action: 'CREATION',
      timestamp: new Date('2024-12-14T14:20:00'),
      details: 'Création d\'un nouvel utilisateur'
    },
    {
      admin: mockUsers[0],
      action: 'SUPPRESSION',
      timestamp: new Date('2024-12-14T11:45:00'),
      details: 'Suppression de la catégorie #5'
    }
  ],
  permissionUsage: [
    { permission: 'user:read', count: 4, percentage: 100 },
    { permission: 'user:write', count: 3, percentage: 75 },
    { permission: 'product:read', count: 4, percentage: 100 },
    { permission: 'product:write', count: 3, percentage: 75 },
    { permission: 'report:read', count: 4, percentage: 100 },
    { permission: 'report:export', count: 2, percentage: 50 },
    { permission: 'finance:read', count: 2, percentage: 50 },
    { permission: 'role:manage', count: 1, percentage: 25 }
  ]
};

export const mockAdminActivities: AdminActivity[] = [
  {
    id: 1,
    adminId: 1,
    admin: mockUsers[0],
    action: 'CONNEXION',
    module: 'Authentification',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    timestamp: new Date('2024-12-15T08:30:00')
  },
  {
    id: 2,
    adminId: 1,
    admin: mockUsers[0],
    action: 'MODIFICATION',
    module: 'Gestion des utilisateurs',
    details: 'Modification des permissions de l\'utilisateur #3',
    ipAddress: '192.168.1.100',
    timestamp: new Date('2024-12-15T08:45:00')
  },
  {
    id: 3,
    adminId: 2,
    admin: mockUsers[1],
    action: 'CREATION',
    module: 'Gestion des produits',
    details: 'Création du produit "Nouveau Produit Premium"',
    ipAddress: '192.168.1.101',
    timestamp: new Date('2024-12-15T09:15:00')
  },
  {
    id: 4,
    adminId: 3,
    admin: mockUsers[2],
    action: 'SUPPRESSION',
    module: 'Gestion des stocks',
    details: 'Suppression de l\'alerte stock #12',
    ipAddress: '192.168.1.102',
    timestamp: new Date('2024-12-15T10:30:00')
  },
  {
    id: 5,
    adminId: 1,
    admin: mockUsers[0],
    action: 'EXPORT',
    module: 'Rapports',
    details: 'Export du rapport financier mensuel',
    ipAddress: '192.168.1.100',
    timestamp: new Date('2024-12-15T11:00:00')
  },
  {
    id: 6,
    adminId: 2,
    admin: mockUsers[1],
    action: 'MODIFICATION',
    module: 'Paramètres système',
    details: 'Mise à jour des paramètres de notification',
    ipAddress: '192.168.1.101',
    timestamp: new Date('2024-12-15T14:20:00')
  }
];