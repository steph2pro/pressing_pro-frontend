import React, { ChangeEvent, FormEvent } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineXMark } from 'react-icons/hi2';

interface AddDataProps {
  slug: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddData: React.FC<AddDataProps> = ({
  slug,
  isOpen,
  //   columns,
  setIsOpen,
}) => {
  // global
  const [showModal, setShowModal] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);

  // add user
  const [nom, setNom] = React.useState('');
  const [adresse, setAdresse] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [telephone, setTelephone] = React.useState('');
  const [passWord, setPassWord] = React.useState('');
  const [isVerified, setIsVerified] = React.useState('');
  const [formUserIsEmpty, setFormUserIsEmpty] = React.useState(true);

  // add product
  const [title, setTitle] = React.useState('');
  const [color, setColor] = React.useState('');
  const [producer, setProducer] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [inStock, setInStock] = React.useState('');
  const [formProductIsEmpty, setFormProductIsEmpty] =
    React.useState(true);

  // global
  const loadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUpload = e.target.files[0];
      setFile(imageUpload);
      setPreview(URL.createObjectURL(imageUpload));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast('Gabisa dong!', { icon: '😛' });
  };

  React.useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  // add user
  React.useEffect(() => {
    if (
      nom === '' ||
      adresse === '' ||
      email === '' ||
      telephone === '' ||
      passWord === '' ||
      isVerified === '' ||
      file === null
    ) {
      setFormUserIsEmpty(true);
    }

    if (
      nom !== '' &&
      adresse !== '' &&
      email !== '' &&
      telephone !== '' &&
      passWord !== '' &&
      isVerified !== '' &&
      file !== null
    ) {
      setFormUserIsEmpty(false);
    }
  }, [email, file, nom, isVerified, adresse, telephone, passWord]);

  React.useEffect(() => {
    if (
      title === '' ||
      color === '' ||
      producer === '' ||
      price === '' ||
      inStock === '' ||
      file === null
    ) {
      setFormProductIsEmpty(true);
    }

    if (
      title !== '' &&
      color !== '' &&
      producer !== '' &&
      price !== '' &&
      inStock !== '' &&
      file !== null
    ) {
      setFormProductIsEmpty(false);
    }
  }, [color, file, inStock, price, producer, title]);

  if (slug === 'user') {
    return (
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black/75 z-[99]">
        <div
          className={`w-[80%] xl:w-[50%] rounded-lg p-7 bg-base-100 relative transition duration-300 flex flex-col items-stretch gap-5 ${
            showModal ? 'translate-y-0' : 'translate-y-full'
          }
            ${showModal ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="flex justify-between w-full pb-5 border-b border-base-content border-opacity-30">
            <button
              onClick={() => {
                setShowModal(false);
                setIsOpen(false);
              }}
              className="absolute top-5 right-3 btn btn-ghost btn-circle"
            >
              <HiOutlineXMark className="text-xl font-bold" />
            </button>
            <span className="text-2xl font-bold">Add new {slug}</span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2"
          >
            <input
              type="text"
              placeholder="Nom complet"
              className="w-full input input-bordered"
              name="Nom"
              id="Nom"
              onChange={(element) =>
                setNom(element.target.value)
              }
            />
            <input
              type="text"
              placeholder="Adresse"
              className="w-full input input-bordered"
              name="Adresse"
              id="Adresse"
              onChange={(element) =>
                setAdresse(element.target.value)
              }
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full input input-bordered"
              name="email"
              id="email"
              onChange={(element) => setEmail(element.target.value)}
            />
           
            <input
              type="phone"
              placeholder="Telephone"
              className="w-full input input-bordered"
              name="Telephone"
              id="Telephone"
              onChange={(element) => setTelephone(element.target.value)}
            />
            <label className="w-full form-control">
              <div className="label">
                <span className="label-text">Verified Status</span>
              </div>
              <select
                className="select select-bordered"
                name="isVerified"
                id="isVerified"
                onChange={(element) =>
                  setIsVerified(element.target.value)
                }
              >
                <option disabled selected>
                  Select one
                </option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </label>
            <label className="w-full form-control">
              <div className="label">
                <span className="label-text">
                  Pick a profile photo
                </span>
              </div>
              <input
                type="file"
                className="w-full file-input file-input-bordered"
                onChange={loadImage}
              />
            </label>
             <input
              type="password"
              placeholder="Password"
              className="w-full input input-bordered"
              name="password"
              id="password"
              onChange={(element) => setPassWord(element.target.value)}
            />
            {preview && preview !== '' && (
              <div className="flex flex-col items-start w-full gap-3">
                <span>Profile Preview</span>
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <img src={preview} alt="profile-upload" />
                  </div>
                </div>
              </div>
            )}
            <button
              className={`mt-5 btn ${
                formUserIsEmpty ? 'btn-disabled' : 'btn-primary'
              } btn-block col-span-full font-semibold`}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (slug === 'product') {
    return (
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black/75 z-[99]">
        <div
          className={`w-[80%] xl:w-[50%] rounded-lg p-7 bg-base-100 relative transition duration-300 flex flex-col items-stretch gap-5 ${
            showModal ? 'translate-y-0' : 'translate-y-full'
          }
            ${showModal ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="flex justify-between w-full pb-5 border-b border-base-content border-opacity-30">
            <button
              onClick={() => {
                setShowModal(false);
                setIsOpen(false);
              }}
              className="absolute top-5 right-3 btn btn-ghost btn-circle"
            >
              <HiOutlineXMark className="text-xl font-bold" />
            </button>
            <span className="text-2xl font-bold">Add new {slug}</span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2"
          >
            <input
              type="text"
              placeholder="Product Title"
              className="w-full input input-bordered"
              name="title"
              id="title"
              onChange={(element) => setTitle(element.target.value)}
            />
            <input
              type="text"
              placeholder="Colour: Black, White, Red, etc"
              className="w-full input input-bordered"
              name="color"
              id="color"
              onChange={(element) => setColor(element.target.value)}
            />
            <input
              type="text"
              placeholder="Producer: Samsung, Apple, etc"
              className="w-full input input-bordered"
              name="producer"
              id="producer"
              onChange={(element) =>
                setProducer(element.target.value)
              }
            />
            <input
              type="text"
              placeholder="Price"
              className="w-full input input-bordered"
              name="price"
              id="price"
              onChange={(element) => setPrice(element.target.value)}
            />
            <label className="w-full form-control">
              <div className="label">
                <span className="label-text">In Stock Status</span>
              </div>
              <select
                className="select select-bordered"
                name="inStock"
                id="inStock"
                onChange={(element) =>
                  setInStock(element.target.value)
                }
              >
                <option disabled selected>
                  Select one
                </option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </label>
            <label className="w-full form-control">
              <div className="label">
                <span className="label-text">
                  Pick a product image
                </span>
              </div>
              <input
                type="file"
                className="w-full file-input file-input-bordered"
                onChange={loadImage}
              />
            </label>
            {preview && preview !== '' && (
              <div className="flex flex-col items-start w-full gap-3">
                <span>Product Preview</span>
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <img src={preview} alt="profile-upload" />
                  </div>
                </div>
              </div>
            )}
            <button
              className={`mt-5 btn ${
                formProductIsEmpty ? 'btn-disabled' : 'btn-primary'
              } btn-block col-span-full font-semibold`}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }

  return null;
};

export default AddData;
