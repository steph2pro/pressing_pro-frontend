
import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineUsers,
  HiOutlineCube,
  HiOutlineClipboardDocumentList,
  HiOutlineDocumentChartBar,
  HiOutlinePencilSquare,
  HiOutlineCalendarDays,
  HiOutlinePresentationChartBar,
  HiOutlineDocumentText,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineCurrencyDollar,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineShieldCheck,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineArrowTrendingUp,
  HiOutlineBuildingStorefront,
} from 'react-icons/hi2';

export const menu = [
  {
    catalog: 'principal',
    listItems: [
      { isLink: true, url: '/', icon: HiOutlineHome, label: 'accueil' },
      { isLink: true, url: '/profile', icon: HiOutlineUser, label: 'profil' },
    ],
  },

  {
    catalog: 'stock',
    listItems: [
      { isLink: true, url: '/products', icon: HiOutlineCube, label: 'Produits' },
      { isLink: true, url: '/categories', icon: HiOutlineClipboardDocumentList, label: 'Catégories' },
      { isLink: true, url: '/supplies', icon: HiOutlineCheckCircle, label: 'Approv' },
      { isLink: true, url: '/ventes', icon: HiOutlineArrowTrendingUp, label: 'Ventes' },
      { isLink: true, url: '/notifications', icon: HiOutlineExclamationTriangle, label: 'Alertes' },
    ],
  },

  {
    catalog: 'finance',
    listItems: [
      { isLink: true, url: '/expensives', icon: HiOutlineCurrencyDollar, label: 'Dépenses' },
      { isLink: true, url: '/transactions', icon: HiOutlineDocumentText, label: 'Transactions' },
      { isLink: true, url: '/benefices', icon: HiOutlineChartBar, label: 'Gains' },
    ],
  },

  {
    catalog: 'statistiques',
    listItems: [
      { isLink: true, url: '/repports', icon: HiOutlineClipboardDocumentList, label: 'Rapports' },
      { isLink: true, url: '/charts', icon: HiOutlinePresentationChartBar, label: 'Statistiques' },
      { isLink: true, url: '/audits', icon: HiOutlineDocumentText, label: 'Historique' },
    ],
  },

  {
    catalog: 'utilisateurs',
    listItems: [
      { isLink: true, url: '/users', icon: HiOutlineUsers, label: 'Utilisateurs' },
      { isLink: true, url: '/roles', icon: HiOutlineUser, label: 'Privileges' },
      { isLink: true, url: '/admins', icon: HiOutlineShieldCheck, label: 'Administrateurs' },
    ],
  },

  {
    catalog: 'parametres',
    listItems: [
      { isLink: true, url: '/fournisseurs', icon: HiOutlineBuildingStorefront, label: 'Fournisseurs' },
      { isLink: true, url: '/configuration', icon: HiOutlineCog, label: 'Configuration' },
    ],
  },

  {
    catalog: 'divers',
    listItems: [
      { isLink: true, url: '/deconnexion', icon: HiOutlineArrowLeftOnRectangle, label: 'déconnexion' },
    ],
  },
];