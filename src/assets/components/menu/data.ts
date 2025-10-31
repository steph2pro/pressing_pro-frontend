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
} from 'react-icons/hi2';
// import { IoSettingsOutline } from 'react-icons/io5';

export const menu = [
  {
    catalog: 'principal',
    listItems: [
      {
        isLink: true,
        url: '/',
        icon: HiOutlineHome,
        label: 'accueil',
      },
      {
        isLink: true,
        url: '/profile',
        icon: HiOutlineUser,
        label: 'profil',
      },
    ],
  },
  {
    catalog: 'gestion',
    listItems: [{
        isLink: true,
        url: '/users',
        icon: HiOutlineUsers,
        label: 'Utilisateurs',
      },
      {
        isLink: true,
        url: '/clients',
        icon: HiOutlineUsers,
        label: 'clients',
      },
      {
        isLink: true,
        url: '/vetements',
        icon: HiOutlineCube,
        label: 'vetements',
      },
      {
        isLink: true,
        url: '/retraits',
        icon: HiOutlineDocumentChartBar,
        label: 'retraits',
      },
      {
        isLink: true,
        url: '/orders',
        icon: HiOutlineClipboardDocumentList,
        label: 'Factures',
      },
    ],
  },
  // {
  //   catalog: 'général',
  //   listItems: [
  //     {
  //       isLink: true,
  //       url: '/notes',
  //       icon: HiOutlinePencilSquare,
  //       label: 'notes',
  //     },
  //     {
  //       isLink: true,
  //       url: '/calendar',
  //       icon: HiOutlineCalendarDays,
  //       label: 'calendrier',
  //     },
  //   ],
  // },
  {
    catalog: 'statistiques',
    listItems: [
      {
        isLink: true,
        url: '/charts',
        icon: HiOutlinePresentationChartBar,
        label: 'statistiques',
      },
      {
        isLink: true,
        url: '/logs',
        icon: HiOutlineDocumentText,
        label: 'historique',
      },
    ],
  },
  {
    catalog: 'divers',
    listItems: [
      // {
      //   isLink: true,
      //   url: '/parametres',
      //   icon: IoSettingsOutline,
      //   label: 'paramètres',
      // },
      {
        isLink: true,
        url: '/deconnexion',
        icon: HiOutlineArrowLeftOnRectangle,
        label: 'déconnexion',
      },
    ],
  },
];
