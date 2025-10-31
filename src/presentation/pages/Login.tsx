import React from 'react';
import ChangeThemes from '../components/ChangesThemes';
import { useLogin } from '../hooks/users/useLogin';

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    loading,
    error,
  } = useLogin();

  return (
    <div className="w-full p-0 m-0">
      {/* Background avec dégradé Ubuntu */}
      <div className="relative flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-ubuntu-aubergine via-ubuntu-darkAubergine to-ubuntu-orange">
        <div className="absolute top-5 right-5 z-[99]">
          <ChangeThemes />
        </div>

        {/* Carte de login */}
        <div className="w-full h-screen xl:h-auto xl:w-[32%] 2xl:w-[25%] 3xl:w-[20%] bg-ubuntu-white rounded-2xl shadow-2xl flex flex-col items-center p-7 pb-10 gap-8 pt-20 xl:pt-10 border border-ubuntu-lightGrey/40">
          {/* Logo et titre */}
          <div className="flex flex-col items-center gap-2 text-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-[80px] h-12 xl:w-[200px] xl:h-14 object-contain "
            />
            <span className="text-[22px] xl:text-3xl font-bold text-ubuntu-aubergine tracking-wide">
              DevTech Management
            </span>
            <span className="text-ubuntu-darkAubergine/80 font-medium text-sm xl:text-base">
              Bonjour 👋, bon retour parmi nous !
            </span>
          </div>

          {/* Message d’erreur */}
          {error && (
            <div className="text-sm text-center text-red-600 bg-red-50 py-2 px-3 rounded-md w-full">
              {error}
            </div>
          )}

          {/* Formulaire */}
          <div className="flex flex-col items-stretch w-full gap-4 mt-2">
            {/* Email */}
            <label className="flex items-center gap-2 input input-bordered border-ubuntu-lightGrey/60 focus-within:border-ubuntu-orange rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-ubuntu-aubergine opacity-70" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2.5 3A1.5 1.5 0..." />
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-auto pl-1 pr-0 border-none outline-none grow text-sm text-ubuntu-darkAubergine placeholder:text-ubuntu-warmGrey"
                placeholder="Adresse e-mail"
              />
            </label>

            {/* Password */}
            <label className="flex items-center gap-2 input input-bordered border-ubuntu-lightGrey/60 focus-within:border-ubuntu-orange rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-ubuntu-aubergine opacity-70" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M14 6a4 4 0..." clipRule="evenodd" />
              </svg>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-auto pl-1 pr-0 border-none outline-none grow text-sm text-ubuntu-darkAubergine placeholder:text-ubuntu-warmGrey"
                placeholder="Mot de passe"
              />
            </label>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between mt-1">
              <label className="gap-2 cursor-pointer label">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded-md checkbox border-ubuntu-orange text-ubuntu-orange focus:ring-ubuntu-orange"
                />
                <span className="text-xs label-text text-ubuntu-darkAubergine/90">
                  Se souvenir de moi
                </span>
              </label>
              <a
                href="#"
                className="text-xs font-semibold text-ubuntu-orange hover:underline"
              >
                Mot de passe oublié ?
              </a>
            </div>

            {/* Submit button */}
            <button
              onClick={handleLogin}
              className="btn btn-block border-none bg-ubuntu-orange hover:bg-ubuntu-aubergine text-ubuntu-white font-semibold mt-1 transition-all duration-200"
              disabled={loading}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>

            {/* Divider + Socials */}
            <div className="text-sm divider text-ubuntu-darkAubergine/70">OU</div>
            <div className="flex items-center justify-center w-full gap-4">
              <button className="btn btn-circle bg-ubuntu-lightGrey/40 hover:bg-ubuntu-lightGrey/60 border-none">
                <img className="w-6" src="/icons8-microsoft.svg" alt="microsoft" />
              </button>
              <button className="btn btn-circle bg-ubuntu-lightGrey/40 hover:bg-ubuntu-lightGrey/60 border-none">
                <img className="w-6" src="/icons8-google.svg" alt="google" />
              </button>
              <button className="btn btn-circle bg-ubuntu-lightGrey/40 hover:bg-ubuntu-lightGrey/60 border-none">
                <img className="w-6" src="/icons8-apple-black.svg" alt="apple" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
