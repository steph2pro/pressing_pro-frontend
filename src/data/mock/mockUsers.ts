import { Role } from '../models/roles';
import { 
  User, 
  UserRole, 
  UserStatus,
  Permission,
  RolePermissions,
  UserStatistics,
} from '../models/users';

export const mockRoles: Role[] = [
  {
    id: 1,
    nom: 'Administrateur',
    code: UserRole.ADMIN,
    description: 'Accès complet à toutes les fonctionnalités du système',
    permissions: [
      'user:read', 'user:write', 'user:delete',
      'product:read', 'product:write', 'product:delete',
      'category:read', 'category:write', 'category:delete',
      'stock:read', 'stock:write', 'stock:delete',
      'sale:read', 'sale:write', 'sale:delete',
      'report:read', 'report:write', 'report:export',
      'finance:read', 'finance:write',
      'role:read', 'role:write', 'role:delete'
    ],
    utilisateursCount: 1,
    dateCreation: new Date('2024-01-01')
  },
  {
    id: 2,
    nom: 'Directeur',
    code: UserRole.DIRECTOR,
    description: 'Administration du système avec restrictions mineures',
    permissions: [
      'user:read', 'user:write',
      'product:read', 'product:write', 'product:delete',
      'category:read', 'category:write',
      'stock:read', 'stock:write',
      'sale:read', 'sale:write',
      'report:read', 'report:export',
      'finance:read',
      'role:read'
    ],
    utilisateursCount: 1,
    dateCreation: new Date('2024-01-01')
  },
  {
    id: 3,
    nom: 'Manager',
    code: UserRole.MANAGER,
    description: 'Gestion des opérations quotidiennes et rapports',
    permissions: [
      'product:read', 'product:write',
      'category:read', 'category:write',
      'stock:read', 'stock:write',
      'sale:read', 'sale:write',
      'report:read', 'report:export'
    ],
    utilisateursCount: 1,
    dateCreation: new Date('2024-01-01')
  },
  {
    id: 4,
    nom: 'Caissier',
    code: UserRole.CASHIER,
    description: 'Gestion des ventes et transactions',
    permissions: [
      'product:read',
      'stock:read',
      'sale:read', 'sale:write'
    ],
    utilisateursCount: 2,
    dateCreation: new Date('2024-01-01')
  },
  {
    id: 5,
    nom: 'Employé',
    code: UserRole.EMPLOYEE,
    description: 'Accès limité aux fonctionnalités opérationnelles',
    permissions: [
      'product:read',
      'sale:read'
    ],
    utilisateursCount: 3,
    dateCreation: new Date('2024-01-01')
  }
];

// Mettre à jour les utilisateurs mockés pour utiliser les nouveaux rôles
export const mockUsers: User[] = [
  {
    id: 1,
    nom: 'Jean Dupont',
    email: 'jean.dupont@entreprise.com',
    role: UserRole.ADMIN,
    statut: UserStatus.ACTIVE,
    telephone: '+237 6 12 34 56 78',
    lastLogin: new Date('2024-12-15T08:30:00'),
    dateCreation: new Date('2024-01-01')
  },
  {
    id: 2,
    nom: 'Marie Lambert',
    email: 'marie.lambert@entreprise.com',
    role: UserRole.DIRECTOR,
    statut: UserStatus.ACTIVE,
    telephone: '+237 6 23 45 67 89',
    lastLogin: new Date('2024-12-15T09:15:00'),
    dateCreation: new Date('2024-01-15')
  },
  {
    id: 3,
    nom: 'Pierre Martin',
    email: 'pierre.martin@entreprise.com',
    role: UserRole.MANAGER,
    statut: UserStatus.ACTIVE,
    telephone: '+237 6 34 56 78 90',
    lastLogin: new Date('2024-12-14T14:20:00'),
    dateCreation: new Date('2024-02-01')
  },
  {
    id: 4,
    nom: 'Sophie Bernard',
    email: 'sophie.bernard@entreprise.com',
    role: UserRole.CASHIER,
    statut: UserStatus.ACTIVE,
    lastLogin: new Date('2024-12-15T10:45:00'),
    dateCreation: new Date('2024-02-15')
  },
  {
    id: 5,
    nom: 'Luc Dubois',
    email: 'luc.dubois@entreprise.com',
    role: UserRole.CASHIER,
    statut: UserStatus.INACTIVE,
    telephone: '+237 6 45 67 89 01',
    lastLogin: new Date('2024-11-30T16:30:00'),
    dateCreation: new Date('2024-03-01')
  },
  {
    id: 6,
    nom: 'Alice Moreau',
    email: 'alice.moreau@entreprise.com',
    role: UserRole.EMPLOYEE,
    statut: UserStatus.ACTIVE,
    lastLogin: new Date('2024-12-15T11:20:00'),
    dateCreation: new Date('2024-03-15')
  },
  {
    id: 7,
    nom: 'David Petit',
    email: 'david.petit@entreprise.com',
    role: UserRole.EMPLOYEE,
    statut: UserStatus.ACTIVE,
    telephone: '+237 6 56 78 90 12',
    lastLogin: new Date('2024-12-15T07:45:00'),
    dateCreation: new Date('2024-04-01')
  },
  {
    id: 8,
    nom: 'Nathalie Roux',
    email: 'nathalie.roux@entreprise.com',
    role: UserRole.EMPLOYEE,
    statut: UserStatus.SUSPENDED,
    lastLogin: new Date('2024-12-10T13:15:00'),
    dateCreation: new Date('2024-04-15')
  }
];


// import { 
//   User, 
//   UserRole, 
//   UserStatus,
//   Permission,
//   RolePermissions,
//   UserStatistics 
// } from '../models/users';

export const mockPermissions: Permission[] = [
  {
    id: 1,
    nom: 'Lecture Utilisateurs',
    code: 'user:read',
    description: 'Permission de consulter les utilisateurs'
  },
  {
    id: 2,
    nom: 'Écriture Utilisateurs',
    code: 'user:write',
    description: 'Permission de créer et modifier les utilisateurs'
  },
  {
    id: 3,
    nom: 'Suppression Utilisateurs',
    code: 'user:delete',
    description: 'Permission de supprimer les utilisateurs'
  },
  {
    id: 4,
    nom: 'Lecture Produits',
    code: 'product:read',
    description: 'Permission de consulter les produits'
  },
  {
    id: 5,
    nom: 'Écriture Produits',
    code: 'product:write',
    description: 'Permission de créer et modifier les produits'
  },
  {
    id: 6,
    nom: 'Suppression Produits',
    code: 'product:delete',
    description: 'Permission de supprimer les produits'
  },
  {
    id: 7,
    nom: 'Lecture Catégories',
    code: 'category:read',
    description: 'Permission de consulter les catégories'
  },
  {
    id: 8,
    nom: 'Écriture Catégories',
    code: 'category:write',
    description: 'Permission de créer et modifier les catégories'
  },
  {
    id: 9,
    nom: 'Lecture Stocks',
    code: 'stock:read',
    description: 'Permission de consulter les stocks'
  },
  {
    id: 10,
    nom: 'Écriture Stocks',
    code: 'stock:write',
    description: 'Permission de gérer les stocks'
  },
  {
    id: 11,
    nom: 'Lecture Ventes',
    code: 'sale:read',
    description: 'Permission de consulter les ventes'
  },
  {
    id: 12,
    nom: 'Écriture Ventes',
    code: 'sale:write',
    description: 'Permission de créer des ventes'
  },
  {
    id: 13,
    nom: 'Lecture Rapports',
    code: 'report:read',
    description: 'Permission de consulter les rapports'
  },
  {
    id: 14,
    nom: 'Export Rapports',
    code: 'report:export',
    description: 'Permission d\'exporter les rapports'
  },
  {
    id: 15,
    nom: 'Lecture Finances',
    code: 'finance:read',
    description: 'Permission de consulter les données financières'
  },
  {
    id: 16,
    nom: 'Gestion Rôles',
    code: 'role:manage',
    description: 'Permission de gérer les rôles et permissions'
  }
];

export const mockRolePermissions: RolePermissions[] = [
  {
    role: UserRole.ADMIN,
    permissions: mockPermissions.map(p => p.code)
  },
  {
    role: UserRole.DIRECTOR,
    permissions: [
      'user:read', 'user:write',
      'product:read', 'product:write', 'product:delete',
      'category:read', 'category:write',
      'stock:read', 'stock:write',
      'sale:read', 'sale:write',
      'report:read', 'report:export',
      'finance:read'
    ]
  },
  {
    role: UserRole.MANAGER,
    permissions: [
      'product:read', 'product:write',
      'category:read', 'category:write',
      'stock:read', 'stock:write',
      'sale:read', 'sale:write',
      'report:read', 'report:export'
    ]
  },
  {
    role: UserRole.CASHIER,
    permissions: [
      'product:read',
      'stock:read',
      'sale:read', 'sale:write'
    ]
  },
  {
    role: UserRole.EMPLOYEE,
    permissions: [
      'product:read',
      'sale:read'
    ]
  }
];

// export const mockUsers: User[] = [
//   {
//     id: 1,
//     nom: 'Jean Dupont',
//     email: 'jean.dupont@entreprise.com',
//     role: UserRole.ADMIN,
//     statut: UserStatus.ACTIVE,
//     telephone: '+237 6 12 34 56 78',
//     lastLogin: new Date('2024-12-15T08:30:00'),
//     dateCreation: new Date('2024-01-01')
//   },
//   {
//     id: 2,
//     nom: 'Marie Lambert',
//     email: 'marie.lambert@entreprise.com',
//     role: UserRole.DIRECTOR,
//     statut: UserStatus.ACTIVE,
//     telephone: '+237 6 23 45 67 89',
//     lastLogin: new Date('2024-12-15T09:15:00'),
//     dateCreation: new Date('2024-01-15')
//   },
//   {
//     id: 3,
//     nom: 'Pierre Martin',
//     email: 'pierre.martin@entreprise.com',
//     role: UserRole.MANAGER,
//     statut: UserStatus.ACTIVE,
//     telephone: '+237 6 34 56 78 90',
//     lastLogin: new Date('2024-12-14T14:20:00'),
//     dateCreation: new Date('2024-02-01')
//   },
//   {
//     id: 4,
//     nom: 'Sophie Bernard',
//     email: 'sophie.bernard@entreprise.com',
//     role: UserRole.CASHIER,
//     statut: UserStatus.ACTIVE,
//     lastLogin: new Date('2024-12-15T10:45:00'),
//     dateCreation: new Date('2024-02-15')
//   },
//   {
//     id: 5,
//     nom: 'Luc Dubois',
//     email: 'luc.dubois@entreprise.com',
//     role: UserRole.CASHIER,
//     statut: UserStatus.INACTIVE,
//     telephone: '+237 6 45 67 89 01',
//     lastLogin: new Date('2024-11-30T16:30:00'),
//     dateCreation: new Date('2024-03-01')
//   },
//   {
//     id: 6,
//     nom: 'Alice Moreau',
//     email: 'alice.moreau@entreprise.com',
//     role: UserRole.EMPLOYEE,
//     statut: UserStatus.ACTIVE,
//     lastLogin: new Date('2024-12-15T11:20:00'),
//     dateCreation: new Date('2024-03-15')
//   },
//   {
//     id: 7,
//     nom: 'David Petit',
//     email: 'david.petit@entreprise.com',
//     role: UserRole.EMPLOYEE,
//     statut: UserStatus.ACTIVE,
//     telephone: '+237 6 56 78 90 12',
//     lastLogin: new Date('2024-12-15T07:45:00'),
//     dateCreation: new Date('2024-04-01')
//   },
//   {
//     id: 8,
//     nom: 'Nathalie Roux',
//     email: 'nathalie.roux@entreprise.com',
//     role: UserRole.EMPLOYEE,
//     statut: UserStatus.SUSPENDED,
//     lastLogin: new Date('2024-12-10T13:15:00'),
//     dateCreation: new Date('2024-04-15')
//   }
// ];

export const mockUserStatistics: UserStatistics = {
  totalUsers: 8,
  activeUsers: 6,
  inactiveUsers: 1,
  suspendedUsers: 1,
  newUsersThisMonth: 2,
  roleDistribution: [
    { role: UserRole.ADMIN, count: 1, percentage: 12.5 },
    { role: UserRole.DIRECTOR, count: 1, percentage: 12.5 },
    { role: UserRole.MANAGER, count: 1, percentage: 12.5 },
    { role: UserRole.CASHIER, count: 2, percentage: 25 },
    { role: UserRole.EMPLOYEE, count: 3, percentage: 37.5 }
  ],
  monthlyActivity: [
    { month: 'Jan 2024', logins: 45, newUsers: 2 },
    { month: 'Fév 2024', logins: 62, newUsers: 1 },
    { month: 'Mar 2024', logins: 78, newUsers: 2 },
    { month: 'Avr 2024', logins: 85, newUsers: 2 },
    { month: 'Mai 2024', logins: 92, newUsers: 1 },
    { month: 'Jun 2024', logins: 87, newUsers: 0 },
    { month: 'Jul 2024', logins: 76, newUsers: 0 },
    { month: 'Aoû 2024', logins: 94, newUsers: 0 },
    { month: 'Sep 2024', logins: 108, newUsers: 0 },
    { month: 'Oct 2024', logins: 115, newUsers: 0 },
    { month: 'Nov 2024', logins: 124, newUsers: 0 },
    { month: 'Dec 2024', logins: 98, newUsers: 0 }
  ]
};