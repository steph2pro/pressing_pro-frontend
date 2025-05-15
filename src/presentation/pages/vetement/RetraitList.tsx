import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../../../components/DataTable';
import { fetchProducts } from '../../../api/ApiCollection';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import AddData from '../../../components/AddData';

const RetraitList = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ['allproducts'],
    queryFn: fetchProducts,
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    // {
    //   field: 'img',
    //   headerName: 'Vetement',
    //   minWidth: 300,
    //   flex: 1,
    //   renderCell: (params) => {
    //     return (
    //       <div className="flex items-center gap-3">
    //         <div className="flex items-center justify-center w-6 overflow-hidden xl:w-10">
    //           <img
    //             src={params.row.img || '/corrugated-box.jpg'}
    //             alt="product-picture"
    //             className="object-cover"
    //           />
    //         </div>
    //         <span className="pb-0 mb-0 leading-none">
    //           {params.row.title}
    //         </span>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   field: 'title',
    //   type: 'string',
    //   headerName: 'Title',
    //   width: 250,
    // },
    {
      field: 'color',
      type: 'string',
      headerName: 'date retrait',
      minWidth: 100,
      flex: 1,
    },
    {
      field: 'price',
      headerName: 'statut',
      type: 'boolean',
      minWidth: 80,
      flex: 1,
    },
    {
      field: 'producer',
      headerName: 'Auteur',
      type: 'string',
      minWidth: 100,
      flex: 1,
    },
    
  ];

  React.useEffect(() => {
    if (isLoading) {
      toast.loading('Loading...', { id: 'promiseProducts' });
    }
    if (isError) {
      toast.error('Error while getting the data!', {
        id: 'promiseProducts',
      });
    }
    if (isSuccess) {
      toast.success('Got the data successfully!', {
        id: 'promiseProducts',
      });
    }
  }, [isError, isLoading, isSuccess]);

  return (
    <div className="w-[97%] p-0 m-0">
      <div className="flex flex-col items-stretch w-full gap-3">
        <div className="flex justify-between w-full xl:mb-5">
          <div className="flex flex-col items-start justify-start gap-1">
            <h2 className="pt-0 mt-0 text-2xl font-bold xl:text-4xl text-base-content dark:text-neutral-200">
              Liste des Retrait de vetements effectues
            </h2>
            {data && data.length > 0 && (
              <span className="text-base font-medium text-neutral dark:text-neutral-content">
                {data.length} Retrait trouvés
              </span>
            )}
          </div>
         
        </div>

        {isLoading ? (
          <DataTable
            slug="products"
            columns={columns}
            rows={[]}
            includeActionColumn={true}
          />
        ) : isSuccess ? (
          <DataTable
            slug="products"
            columns={columns}
            rows={data}
            includeActionColumn={true}
          />
        ) : (
          <>
            <DataTable
              slug="products"
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
            slug={'product'}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </div>
  );
};

export default RetraitList;
