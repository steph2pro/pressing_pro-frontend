// import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from 'react-router-dom';
import Home from './presentation/pages/Home';
import Users from './presentation/pages/utilisateur/Users';
import Products from './presentation/pages/Products';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Menu from './components/menu/Menu';
import Error from './presentation/pages/Error';
import Profile from './presentation/pages/Profile';
import Orders from './presentation/pages/Orders';
import Posts from './presentation/pages/Posts';
import Notes from './presentation/pages/Notes';
import Calendar from './presentation/pages/Calendar';
import Charts from './presentation/pages/Charts';
import Logs from './presentation/pages/Logs';
import ToasterProvider from './components/ToasterProvider';
import EditProfile from './presentation/pages/EditProfile';
import User from './presentation/pages/User';
import Product from './presentation/pages/Product';
import Login from './presentation/pages/Login';
import ClientList from './presentation/pages/client/ClientList';
import VetementList from './presentation/pages/vetement/VetementList';
import RetraitList from './presentation/pages/vetement/RetraitList';

function App() {
  const Layout = () => (
    <div className="flex flex-col justify-between w-full min-h-screen p-0 m-0 overflow-visible">
      <ToasterProvider />
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
        {
          path: '/profile/edit',
          element: <EditProfile />,
        },
        
        {
          path: '/clients',
          element: <ClientList />,
        },
        {
          path: '/users',
          element: <Users />,
        },
        {
          path: '/users/:id',
          element: <User />,
        },
        {
          path: '/vetements',
          element: <VetementList />,
        },
        {
          path: '/products/:id',
          element: <Product />,
        },
        {
          path: '/orders',
          element: <Orders />,
        },
        {
          path: '/retraits',
          element: <RetraitList />,
        },
        {
          path: '/notes',
          element: <Notes />,
        },
        {
          path: '/calendar',
          element: <Calendar />,
        },
        {
          path: '/charts',
          element: <Charts />,
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

  return <RouterProvider router={router} />;
}

export default App;
