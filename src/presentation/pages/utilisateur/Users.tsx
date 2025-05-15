import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../../../components/DataTable';
import { fetchUsers } from '../../../api/ApiCollection';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import AddData from '../../../components/AddData';
import useUserGetAll from '../../hooks/useUserGetAll';
import { Utilisateur } from '../../../data/models/Utilisateur ';

const Users = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  // const { isLoading, isError, isSuccess, data } = useQuery({
  //   queryKey: ['allusers'],
    // queryFn: fetchUsers,
  // });
  
  const { userQuery } = useUserGetAll();
  const { data, isLoading, isError,isSuccess } = userQuery;

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'Nom',
      minWidth: 220,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-6 rounded-full xl:w-9">
                <img
                  src={params.row.img || '/Portrait_Placeholder.png'}
                  alt="user-picture"
                />
              </div>
            </div>
            <span className="pb-0 mb-0 leading-none">
              {params.row.firstName} {params.row.lastName}
            </span>
          </div>
        );
      },
    },
    {
      field: 'email',
      type: 'string',
      headerName: 'Adesse',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'phone',
      type: 'string',
      headerName: 'Telephone',
      minWidth: 120,
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'Enregistré le',
      minWidth: 100,
      type: 'string',
      flex: 1,
    },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description:
    //     'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
    {
      field: 'verified',
      headerName: 'Role',
      width: 80,
      type: 'boolean',
      flex: 1,
    },
  ];

  React.useEffect(() => {
    if (isLoading) {
      toast.loading('Loading...', { id: 'promiseUsers' });
    }
    if (isError) {
      toast.error('Error while getting the data!', {
        id: 'promiseUsers',
      });
    }
    if (isSuccess) {
      toast.success('Got the data successfully!', {
        id: 'promiseUsers',
      });
    }
  }, [isError, isLoading, isSuccess]);

  return (
    <div className="w-[97%] p-0 m-0">
      <div className="flex flex-col items-stretch w-full gap-3">
        <div className="flex justify-between w-full mb-5">
          <div className="flex flex-col items-start justify-start gap-1">
            <h2 className="pt-0 mt-0 text-2xl font-bold xl:text-4xl text-base-content dark:text-neutral-200">
              Liste des utilisateurs
            </h2>
            {data && data.length > 0 && (
              <span className="text-base font-medium text-neutral dark:text-neutral-content">
                {data.length} utilisateurs trouvés
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className={`btn ${
              isLoading ? 'btn-disabled' : 'btn-primary'
            }`}
          >
            Ajouter un Utilisateur +
          </button>
        </div>
        {isLoading ? (
          <DataTable
            slug="users"
            columns={columns}
            rows={[]}
            includeActionColumn={true}
          />
        ) : isSuccess ? (
          <DataTable
            slug="users"
            columns={columns}
            rows={data}
            includeActionColumn={true}
          />
        ) : (
          <>
            <DataTable
              slug="users"
              columns={columns}
              rows={[]}
              includeActionColumn={true}
            />
            <div className="flex justify-center w-full">
              Error while getting the data!
            </div>
          </>
        )}

        {isOpen && (
          <AddData
            slug={'user'}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
