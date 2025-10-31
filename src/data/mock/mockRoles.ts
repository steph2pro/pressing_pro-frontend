import { 
  Utilisateur, 
  Role, 
  RoleUtilisateur, 
  Permission,
  UtilisateurStatistiques 
} from '../models/roles';

export const mockRoles: Role[] = [
  {
    id: 1,
    nom: RoleUtilisateur.SUPER_ADMIN,
    description: 'Accès complet à toutes les fonctionnalités du système',
    permissions: Object.values(Permission),
    dateCreation: new Date('2024-01-01'),
    utilisateursCount: 1
  },
  {
    id: 2,
    nom: RoleUtilisateur.ADMIN,
    description: 'Administration du système avec restrictions mineures',
    permissions: [
      Permission.USER_READ, Permission.USER_WRITE,
      Permission.PRODUCT_READ, Permission.PRODUCT_WRITE, Permission.PRODUCT_DELETE,
      Permission.CATEGORY_READ, Permission.CATEGORY_WRITE, Permission.CATEGORY_DELETE,
      Permission.STOCK_READ, Permission.STOCK_WRITE,
      Permission.SALE_READ, Permission.SALE_WRITE,
      Permission.REPORT_READ, Permission.REPORT_EXPORT,
      Permission.FINANCE_READ,
      Permission.ROLE_READ
    ],
    dateCreation: new Date('2024-01-01'),
    utilisateursCount: 2
  },
  {
    id: 3,
    nom: RoleUtilisateur.MANAGER,
    description: 'Gestion des opérations quotidiennes et rapports',
    permissions: [
      Permission.PRODUCT_READ, Permission.PRODUCT_WRITE,
      Permission.CATEGORY_READ, Permission.CATEGORY_WRITE,
      Permission.STOCK_READ, Permission.STOCK_WRITE,
      Permission.SALE_READ, Permission.SALE_WRITE,
      Permission.REPORT_READ, Permission.REPORT_EXPORT,
      Permission.FINANCE_READ
    ],
    dateCreation: new Date('2024-01-01'),
    utilisateursCount: 3
  },
  {
    id: 4,
    nom: RoleUtilisateur.EMPLOYE,
    description: 'Accès limité aux fonctionnalités opérationnelles',
    permissions: [
      Permission.PRODUCT_READ,
      Permission.STOCK_READ,
      Permission.SALE_READ, Permission.SALE_WRITE
    ],
    dateCreation: new Date('2024-01-01'),
    utilisateursCount: 8
  },
  {
    id: 5,
    nom: RoleUtilisateur.CLIENT,
    description: 'Accès client aux fonctionnalités publiques',
    permissions: [
      Permission.PRODUCT_READ,
      Permission.SALE_READ
    ],
    dateCreation: new Date('2024-01-01'),
    utilisateursCount: 150
  }
];

export const mockUtilisateurs: Utilisateur[] = [
  {
    id: 1,
    nom: 'Jean Dupont',
    email: 'jean.dupont@entreprise.com',
    telephone: '+237 6 12 34 56 78',
    role: mockRoles[0],
    statut: 'actif',
    dateCreation: new Date('2024-01-01'),
    dateDerniereConnexion: new Date('2024-12-15T08:30:00')
  },
  {
    id: 2,
    nom: 'Marie Lambert',
    email: 'marie.lambert@entreprise.com',
    telephone: '+237 6 23 45 67 89',
    role: mockRoles[1],
    statut: 'actif',
    dateCreation: new Date('2024-01-15'),
    dateDerniereConnexion: new Date('2024-12-15T09:15:00')
  },
  {
    id: 3,
    nom: 'Pierre Martin',
    email: 'pierre.martin@entreprise.com',
    telephone: '+237 6 34 56 78 90',
    role: mockRoles[1],
    statut: 'actif',
    dateCreation: new Date('2024-02-01'),
    dateDerniereConnexion: new Date('2024-12-14T14:20:00')
  },
  {
    id: 4,
    nom: 'Sophie Bernard',
    email: 'sophie.bernard@entreprise.com',
    role: mockRoles[2],
    statut: 'actif',
    dateCreation: new Date('2024-02-15'),
    dateDerniereConnexion: new Date('2024-12-15T10:45:00')
  },
  {
    id: 5,
    nom: 'Luc Dubois',
    email: 'luc.dubois@entreprise.com',
    telephone: '+237 6 45 67 89 01',
    role: mockRoles[2],
    statut: 'inactif',
    dateCreation: new Date('2024-03-01'),
    dateDerniereConnexion: new Date('2024-11-30T16:30:00')
  },
  {
    id: 6,
    nom: 'Alice Moreau',
    email: 'alice.moreau@entreprise.com',
    role: mockRoles[2],
    statut: 'actif',
    dateCreation: new Date('2024-03-15'),
    dateDerniereConnexion: new Date('2024-12-15T11:20:00')
  },
  {
    id: 7,
    nom: 'David Petit',
    email: 'david.petit@entreprise.com',
    telephone: '+237 6 56 78 90 12',
    role: mockRoles[3],
    statut: 'actif',
    dateCreation: new Date('2024-04-01'),
    dateDerniereConnexion: new Date('2024-12-15T07:45:00')
  },
  {
    id: 8,
    nom: 'Nathalie Roux',
    email: 'nathalie.roux@entreprise.com',
    role: mockRoles[3],
    statut: 'suspendu',
    dateCreation: new Date('2024-04-15'),
    dateDerniereConnexion: new Date('2024-12-10T13:15:00')
  }
];

export const mockUtilisateurStatistiques: UtilisateurStatistiques = {
  totalUtilisateurs: 164,
  utilisateursActifs: 156,
  utilisateursInactifs: 6,
  nouveauxUtilisateursMois: 12,
  repartitionParRole: [
    { role: RoleUtilisateur.SUPER_ADMIN, count: 1, pourcentage: 0.6 },
    { role: RoleUtilisateur.ADMIN, count: 2, pourcentage: 1.2 },
    { role: RoleUtilisateur.MANAGER, count: 3, pourcentage: 1.8 },
    { role: RoleUtilisateur.EMPLOYE, count: 8, pourcentage: 4.9 },
    { role: RoleUtilisateur.CLIENT, count: 150, pourcentage: 91.5 }
  ],
  activiteMensuelle: [
    { mois: 'Jan 2024', connexions: 245, nouveauxUtilisateurs: 3 },
    { mois: 'Fév 2024', connexions: 312, nouveauxUtilisateurs: 5 },
    { mois: 'Mar 2024', connexions: 298, nouveauxUtilisateurs: 4 },
    { mois: 'Avr 2024', connexions: 345, nouveauxUtilisateurs: 6 },
    { mois: 'Mai 2024', connexions: 387, nouveauxUtilisateurs: 8 },
    { mois: 'Jun 2024', connexions: 421, nouveauxUtilisateurs: 12 },
    { mois: 'Jul 2024', connexions: 398, nouveauxUtilisateurs: 10 },
    { mois: 'Aoû 2024', connexions: 456, nouveauxUtilisateurs: 15 },
    { mois: 'Sep 2024', connexions: 512, nouveauxUtilisateurs: 18 },
    { mois: 'Oct 2024', connexions: 587, nouveauxUtilisateurs: 22 },
    { mois: 'Nov 2024', connexions: 634, nouveauxUtilisateurs: 25 },
    { mois: 'Dec 2024', connexions: 723, nouveauxUtilisateurs: 42 }
  ]
};