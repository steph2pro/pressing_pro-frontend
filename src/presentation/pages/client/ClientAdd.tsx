import React, { useState } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';

type Props = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
  handleAddClient: (client: Client) => void;
};

type Client = {
  id: number;
  nom: string;
  adresse: string;
  telephone: string;
};

const ClientAdd: React.FC<Props> = ({ showModal, setShowModal, setIsOpen, handleAddClient }) => {
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [telephone, setTelephone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newClient: Client = {
      id: Date.now(),
      nom,
      adresse,
      telephone,
    };
    handleAddClient(newClient);
    setShowModal(false);
    setIsOpen(false);
  };

  const isFormEmpty = nom.trim() === '' || adresse.trim() === '' || telephone.trim() === '';

  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black/75 z-[99]">
      <div
        className={`w-[80%] xl:w-[40%] rounded-lg p-7 bg-base-100 relative transition duration-300 flex flex-col items-stretch gap-5 ${
          showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <div className="flex justify-between w-full pb-5 border-b border-base-content border-opacity-30">
          <span className="text-2xl font-bold">Ajouter un client</span>
          <button
            onClick={() => {
              setShowModal(false);
              setIsOpen(false);
            }}
            className="absolute top-5 right-3 btn btn-ghost btn-circle"
          >
            <HiOutlineXMark className="text-xl font-bold" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid w-full grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Nom complet"
            className="w-full input input-bordered"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
          <input
            type="text"
            placeholder="Adresse"
            className="w-full input input-bordered"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
          />
          <input
            type="text"
            placeholder="Téléphone"
            className="w-full input input-bordered"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />

          <button
            type="submit"
            className={`mt-5 btn ${isFormEmpty ? 'btn-disabled' : 'btn-primary'} btn-block font-semibold`}
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientAdd;
