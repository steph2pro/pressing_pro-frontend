import React from 'react';
import toast from 'react-hot-toast';
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const modalDelete = React.useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  return (
    <div className="w-full p-0 m-0">
      <div className="flex flex-col items-stretch w-full gap-10 xl:gap-8">
        {/* Bloc 1 */}
        <div className="flex items-start justify-between">
          <h2 className="pt-0 mt-0 text-2xl font-bold xl:text-4xl text-base-content dark:text-neutral-200">
            Mon Profil
          </h2>
          <button
            onClick={() => navigate('/profile/edit')}
            className="text-xs btn xl:text-sm dark:btn-neutral"
          >
            <HiOutlinePencil className="text-lg" /> Modifier mon profil
          </button>
        </div>

        {/* Bloc 2 */}
        <div className="flex items-center gap-3 xl:gap-8 xl:mb-4">
          <div className="avatar">
            <div className="w-24 rounded-full xl:w-36 2xl:w-48">
              <img
                src="https://avatars.githubusercontent.com/u/74099030?v=4"
                alt="photo-de-profil"
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-1">
            <h3 className="text-xl font-semibold xl:text-3xl">Frans AHW</h3>
            <span className="text-base font-normal">Superviseur</span>
          </div>
        </div>

        {/* Bloc 3 */}
        <div className="flex flex-col items-stretch w-full gap-3 xl:gap-7">
          <div className="flex items-center w-full gap-3 xl:gap-5">
            <h4 className="text-lg font-semibold xl:text-2xl whitespace-nowrap">
              Informations de base
            </h4>
            <div className="w-full h-[2px] bg-base-300 dark:bg-slate-700 mt-1"></div>
          </div>

          <div className="grid w-full grid-cols-1 gap-5 xl:grid-cols-3 xl:gap-5 xl:text-base">
            {/* Colonne 1 */}
            <div className="grid w-full grid-cols-3 gap-5 xl:flex xl:gap-8">
              <div className="flex flex-col items-start col-span-1 xl:gap-5">
                <span>Prénom*</span>
                <span>Nom*</span>
                <span>Surnom</span>
              </div>
              <div className="flex flex-col items-start col-span-2 xl:gap-5">
                <span className="font-semibold">Frans</span>
                <span className="font-semibold">AHW</span>
                <span className="font-semibold">Frans</span>
              </div>
            </div>

            {/* Colonne 2 */}
            <div className="grid w-full grid-cols-3 gap-5 xl:flex xl:gap-8">
              <div className="flex flex-col items-start col-span-1 xl:gap-5">
                <span>Email*</span>
                <span>Téléphone</span>
                <span>Adresse</span>
              </div>
              <div className="flex flex-col items-start col-span-2 xl:gap-5">
                <span className="font-semibold">franswinata6@gmail.com</span>
                <span className="font-semibold">081-234-5678</span>
                <span className="font-semibold">
                  Suite 948 Jl. Gajahmada No. 91, Malang, SM 74810
                </span>
              </div>
            </div>

            {/* Colonne 3 */}
            <div className="grid w-full grid-cols-3 gap-5 xl:flex xl:gap-8">
              <div className="flex flex-col items-start col-span-1 xl:gap-5">
                <span>Mot de passe</span>
              </div>
              <div className="flex flex-col items-start col-span-2 xl:gap-5">
                <span className="font-semibold no-underline link link-primary">
                  Changer le mot de passe
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bloc 4 */}
        <div className="flex flex-col items-stretch w-full gap-6 xl:gap-7">
          <div className="flex flex-col gap-2">
            <div className="flex items-center w-full gap-3 xl:gap-5">
              <h4 className="text-lg font-semibold xl:text-2xl whitespace-nowrap">
                Intégrations de compte
              </h4>
              <div className="w-full h-[2px] bg-base-300 dark:bg-slate-700 mt-1"></div>
            </div>
            <span className="text-sm xl:text-sm text-neutral-400 dark:text-neutral-content">
              Autorisez plus rapidement via un compte de service externe.
            </span>
          </div>

          <div className="grid grid-cols-3 gap-5 sm:grid-cols-6 xl:grid-cols-3 xl:flex">
            {/* Colonne 1 */}
            <div className="col-span-2 flex flex-col items-start gap-5 xl:w-[240px]">
              <button
                onClick={() =>
                  toast('Action non autorisée', { icon: '😠' })
                }
                className="justify-start btn btn-block flex-nowrap dark:btn-neutral"
              >
                <img className="w-6" src="/icons8-microsoft.svg" alt="microsoft" />
                <span className="text-xs text-start whitespace-nowrap xl:text-sm">
                  Se connecter avec Microsoft
                </span>
              </button>

              <div className="flex items-center justify-start gap-2 px-4 text-sm font-semibold min-h-12">
                <img className="w-6" src="/icons8-google.svg" alt="google" />
                <span className="text-xs text-start whitespace-nowrap xl:text-sm">
                  Connecté avec Google
                </span>
              </div>

              <button
                onClick={() =>
                  toast('Action non autorisée', { icon: '😠' })
                }
                className="justify-start btn btn-block dark:btn-neutral"
              >
                <img className="w-6 dark:hidden" src="/icons8-apple-black.svg" alt="apple" />
                <img className="hidden w-6 dark:block" src="/icons8-apple-white.svg" alt="apple" />
                <span className="text-xs text-start whitespace-nowrap xl:text-sm">
                  Se connecter avec Apple
                </span>
              </button>
            </div>

            {/* Colonne 2 */}
            <div className="flex flex-col items-start col-span-1 gap-5">
              <button className="btn btn-ghost text-error"></button>
              <button
                onClick={() =>
                  toast('Action non autorisée', { icon: '😠' })
                }
                className="text-xs btn btn-ghost text-error xl:text-sm"
              >
                Déconnecter
              </button>
              <button className="btn btn-ghost text-error"></button>
            </div>
          </div>
        </div>

        {/* Bloc 5 */}
        <div className="flex items-center justify-start w-full mt-10">
          <button
            className="text-xs btn dark:btn-neutral text-error dark:text-error xl:text-sm"
            onClick={() => modalDelete.current?.showModal()}
          >
            <HiOutlineTrash className="text-lg" />
            Supprimer mon compte
          </button>
          <dialog id="modal_delete" className="modal" ref={modalDelete}>
            <div className="modal-box">
              <h3 className="text-lg font-bold dark:text-white">
                Confirmation d'action !
              </h3>
              <p className="py-4">
                Voulez-vous vraiment supprimer votre compte ?
              </p>
              <div className="flex-col items-stretch gap-3 mx-0 modal-action justify-stretch">
                <button
                  onClick={() =>
                    toast('Tu es bien audacieux !', {
                      icon: '😠',
                    })
                  }
                  className="btn btn-error btn-block text-base-100 dark:text-white"
                >
                  Oui, je veux supprimer mon compte
                </button>
                <form method="dialog" className="w-full m-0">
                  <button className="m-0 btn btn-block dark:btn-neutral">
                    Non, je ne pense pas
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Profile;
