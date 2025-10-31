// import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from 'react-router-dom';
import Home from './presentation/pages/Home';

import Error from './presentation/pages/Error';
import Profile from './presentation/pages/Profile';
import Calendar from './presentation/pages/Calendar';
import Charts from './presentation/pages/Charts';
import Logs from './presentation/pages/Logs';
import EditProfile from './presentation/pages/EditProfile';
import Navbar from './presentation/components/Navbar';
// import { Menu } from 'lucide-react';
import Footer from './presentation/components/Footer';
import ToasterProvider from './presentation/components/ToasterProvider';
import Menu from './presentation/components/menu/Menu';
import { ExpenseList } from './presentation/pages/expensives/ExpenseList';
import { ExpenseDetail } from './presentation/pages/expensives/ExpenseDetail';
import { ProductList } from './presentation/pages/products/ProductList';
import { ProductDetail } from './presentation/pages/products/ProductDetail';
import { VenteList } from './presentation/pages/ventes/VenteList';
import { VenteDetail } from './presentation/pages/ventes/VenteDetail';
import { SupplyList } from './presentation/pages/supplies/SupplyList';
import { SupplyDetail } from './presentation/pages/supplies/SupplyDetail';
import { TransactionList } from './presentation/pages/transactions/TransactionList';
import { TransactionDetail } from './presentation/pages/transactions/TransactionDetail';
import { ReportDashboard } from './presentation/pages/repports/ReportDashboard';
import { AuditList } from './presentation/pages/audits/AuditList.tsx';
import Login from './presentation/pages/Login.tsx';
import NotificationList from './presentation/pages/notifications/NotificationList.tsx';
import NotificationDetail from './presentation/pages/notifications/NotificationDetail.tsx';
import { CategoryList } from './presentation/pages/categories/CategoryList.tsx';
import { CategoryDetail } from './presentation/pages/categories/CategoryDetail.tsx';
import { EditCategory } from './presentation/pages/categories/EditCategory.tsx';
import { ProfitMarginAnalysis } from './presentation/pages/benefices/ProfitMarginAnalysis.tsx';
import { RoleDetail } from './presentation/pages/users/RoleDetail.tsx';
import { EditRole } from './presentation/pages/users/EditRole.tsx';
import { UserDetail } from './presentation/pages/users/UserDetail.tsx';
import { EditUser } from './presentation/pages/users/EditUser.tsx';
import UserList from './presentation/pages/users/UserList.tsx';
import { RoleList } from './presentation/pages/users/RoleList.tsx';
import { AdminDashboard } from './presentation/pages/admin/AdminDashboard.tsx';

function App() {
  const Layout = () => (
    <div className="flex flex-col justify-between w-full min-h-screen p-0 m-0 overflow-visible">
      {/* <ToasterProvider /> */}
      <ScrollRestoration />
      <div>
        <Navbar />
        <div className="relative flex min-h-screen">
          <div className="hidden xl:block fixed top-20 p-4 left-0 h-[calc(100vh-80px)] w-[230px] border-r-2 border-base-300 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-y-auto shadow-md rounded-lg">
            <Menu />
          </div>

          <div className="flex flex-col flex-grow xl:ml-[250px] mt-6">
            <div className="flex-grow pt-16 mt-6">
              <Outlet />
            </div>
            <footer className="p-4 text-center text-gray-700 bg-white dark:bg-slate-800 dark:text-white">
              <Footer />
            </footer>
          </div>
        </div>
      </div>
    </div>
  );

  const router = createBrowserRouter([
   
    {
      
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/profile',
          element: <Profile />,
        },
        // {
        //   path: '/entreprise',
        //   element: <CreateEntreprise />,
        // },
        {
          path: '/profile/edit',
          element: <EditProfile />,
        },
        {
          path: '/users',
          element: <UserList />,
        },
        {
          path: '/users/:id',
          element: <UserDetail />,
        },
        {
          path: '/users/:id/edit',
          element: <EditUser />
        },
        {
          path: '/roles',
          element: <RoleList />
        },
        {
          path: '/roles/:id',
          element: <RoleDetail />
        },
        {
          path: '/roles/:id/edit',
          element: <EditRole />
        },
        {
          path: '/admins',
          element: <AdminDashboard />
        },
        {
          path: '/admins/:id',
          element: <RoleDetail />
        },
        {
          path: '/admins/:id/edit',
          element: <EditRole />
        },
        {
          path: '/expensives',
          element: <ExpenseList />,
        },
        {
          path: '/expensives/:id',
          element: <ExpenseDetail />,
        },
        {
          path: '/products',
          element: <ProductList />,
        },
        {
          path: '/products/:id',
          element: <ProductDetail />,
        },
        {
          path: '/ventes',
          element: <VenteList />,
        },
        {
          path: '/ventes/:id',
          element: <VenteDetail />,
        },
        {
          path: '/supplies',
          element: <SupplyList />,
        },
        {
          path: '/supplies/:id',
          element: <SupplyDetail />,
        },
        {
          path: '/categories',
          element: <CategoryList />,
        },
        {
          path: '/categories/:id',
          element: <CategoryDetail />,
        },
        {
          path: '/categories/:id/edit',
          element: <EditCategory />,
        },
        {
          path: '/transactions',
          element: <TransactionList />,
        },
        {
          path: '/transactions/:id',
          element: <TransactionDetail />,
        },
        {
          path: '/repports',
          element: <ReportDashboard />,
        },
        {
          path: '/benefices',
          element: <ProfitMarginAnalysis />,
        },
        // {
        //   path: '/repports/:id',
        //   element: <User />,
        // },
        {
          path: '/audits',
          element: <AuditList />,
        },
        // {
        //   path: '/audits/:id',
        //   element: <Audit />,
        // },
        
        {
          path: '/calendar',
          element: <Calendar />,
        },
        {
          path: '/charts',
          element: <Charts />,
        },
        {
          path: '/notifications',
          element: <NotificationList />,
        },
        {
          path: '/notifications/:id',
          element: <NotificationDetail />,
        },
        {
          path: '/logs',
          element: <Logs />,
        },
      ],
      errorElement: <Error />,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);

  return <>
  <ToasterProvider />
  <RouterProvider router={router} />
  </>;
}

export default App;
