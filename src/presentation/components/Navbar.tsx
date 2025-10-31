import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiBars3CenterLeft } from 'react-icons/hi2';
import { DiReact } from 'react-icons/di';
import { HiSearch, HiOutlineBell } from 'react-icons/hi';
import { RxEnterFullScreen, RxExitFullScreen } from 'react-icons/rx';
import ChangeThemes from './ChangesThemes';
import toast from 'react-hot-toast';
import { menu } from './menu/data';
import MenuItem from './menu/MenuItem';
import logo from "/logo.png";

const Navbar = () => {
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const element = document.getElementById('root');

  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  const navigate = useNavigate();

  React.useEffect(() => {
    const handleFullScreenChange = async () => {
      try {
        if (isFullScreen && element) {
          await element.requestFullscreen({ navigationUI: 'auto' });
        } else if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
      } catch (error) {
        console.error('Erreur fullscreen:', error);
        toast.error('Erreur fullscreen');
      }
    };

    handleFullScreenChange();
  }, [isFullScreen, element]);

  // Écouter les changements de fullscreen
  React.useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  const handleLogout = () => {
    // Ajoutez ici votre logique de déconnexion
    navigate('/login');
  };

  return (
    // navbar screen
    <div className="fixed z-[3] top-0 left-0 right-0 bg-base-100 w-full flex justify-between px-3 xl:px-4 py-3 xl:py-5 gap-4 xl:gap-0">
      {/* container */}
      <div className="flex items-center gap-3">
        {/* for mobile */}
        <div className="w-auto p-0 mr-1 drawer xl:hidden">
          <input
            id="drawer-navbar-mobile"
            type="checkbox"
            className="drawer-toggle"
            checked={isDrawerOpen}
            onChange={toggleDrawer}
          />
          <div className="w-auto p-0 drawer-content">
            <label
              htmlFor="drawer-navbar-mobile"
              className="p-0 btn btn-ghost drawer-button"
            >
              <HiBars3CenterLeft className="text-2xl" />
            </label>
          </div>
          <div className="drawer-side z-[99]">
            <label
              htmlFor="drawer-navbar-mobile"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="w-auto min-h-full p-4 menu bg-base-200 text-base-content">
              <Link
                to={'/'}
                className="flex items-center gap-1 mt-1 mb-5 xl:gap-2"
                onClick={toggleDrawer}
              >
                <DiReact className="text-3xl sm:text-4xl xl:text-4xl 2xl:text-6xl text-primary animate-spin-slow" />
                <span className="text-[16px] leading-[1.2] sm:text-lg xl:text-xl 2xl:text-2xl font-semibold text-base-content dark:text-neutral-200">
                  DevTech
                </span>
              </Link>
              {menu.map((item, index) => (
                <MenuItem
                  onClick={toggleDrawer}
                  key={index}
                  catalog={item.catalog}
                  listItems={item.listItems}
                />
              ))}
            </div>
          </div>
        </div>

        {/* navbar logo */}
        <Link to={'/'} className="flex items-center justify-center gap-0.5">
          <img
            src={logo}
            alt="Logo"
            className="w-[100px] h-auto"
          />
          <span className="-ml-5 text-[16px] sm:text-lg xl:text-xl font-semibold">
            DevTech Managment
          </span>
        </Link>
      </div>

      {/* navbar items to right */}
      <div className="flex items-center gap-0 xl:gap-1 2xl:gap-2 3xl:gap-5">
        {/* search */}
        <button
          onClick={() =>
            toast('Gaboleh cari!', {
              icon: '😠',
            })
          }
          className="hidden sm:inline-flex btn btn-circle btn-ghost"
        >
          <HiSearch className="text-xl 2xl:text-2xl 3xl:text-3xl" />
        </button>

        {/* fullscreen */}
        <button
          onClick={toggleFullScreen}
          className="hidden xl:inline-flex btn btn-circle btn-ghost"
        >
          {isFullScreen ? (
            <RxExitFullScreen className="xl:text-xl 2xl:text-2xl 3xl:text-3xl" />
          ) : (
            <RxEnterFullScreen className="xl:text-xl 2xl:text-2xl 3xl:text-3xl" />
          )}
        </button>

        {/* notification */}
        <button
          onClick={() =>
            toast('Gaada notif!', {
              icon: '😠',
            })
          }
          className="px-0 xl:px-auto btn btn-circle btn-ghost"
        >
          <HiOutlineBell className="text-xl 2xl:text-2xl 3xl:text-3xl" />
        </button>

        {/* theme */}
        <div className="px-0 xl:px-auto btn btn-circle btn-ghost xl:mr-1">
          <ChangeThemes />
        </div>

        {/* avatar dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="rounded-full w-9">
              <img
                src="https://avatars.githubusercontent.com/u/74099030?v=4"
                alt="profile-photo"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40"
          >
            {/* CORRECTION : Supprimer le Link autour du li et utiliser onClick */}
            <li>
              <button onClick={() => navigate('/profile')} className="justify-between">
                My Profile
              </button>
            </li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;