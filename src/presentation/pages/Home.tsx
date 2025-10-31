// import React from 'react';
import TopDealsBox from '../components/topDealsBox/TopDealsBox';
import ChartBox from '../components/charts/ChartBox';
import { useQuery } from '@tanstack/react-query';
import {
  MdGroup,
  MdInventory2,
  MdAssessment,
  MdSwapHorizontalCircle,
} from 'react-icons/md';
import {
  fetchTotalProducts,
  fetchTotalProfit,
  fetchTotalRatio,
  fetchTotalRevenue,
  fetchTotalRevenueByProducts,
  fetchTotalSource,
  fetchTotalUsers,
  fetchTotalVisit,
} from '../../api/ApiCollection';

const Home = () => {
  const queryGetTotalUsers = useQuery({
    queryKey: ['totalusers'],
    queryFn: fetchTotalUsers,
  });

  const queryGetTotalProducts = useQuery({
    queryKey: ['totalproducts'],
    queryFn: fetchTotalProducts,
  });

  const queryGetTotalRatio = useQuery({
    queryKey: ['totalratio'],
    queryFn: fetchTotalRatio,
  });

  const queryGetTotalRevenue = useQuery({
    queryKey: ['totalrevenue'],
    queryFn: fetchTotalRevenue,
  });

  const queryGetTotalSource = useQuery({
    queryKey: ['totalsource'],
    queryFn: fetchTotalSource,
  });

  const queryGetTotalRevenueByProducts = useQuery({
    queryKey: ['totalrevenue-by-products'],
    queryFn: fetchTotalRevenueByProducts,
  });

  const queryGetTotalVisit = useQuery({
    queryKey: ['totalvisit'],
    queryFn: fetchTotalVisit,
  });

  const queryGetTotalProfit = useQuery({
    queryKey: ['totalprofit'],
    queryFn: fetchTotalProfit,
  });

 return (
  // écran
  <div className="w-full p-0 m-0 home">
    {/* grille */}
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 grid-flow-dense auto-rows-[minmax(200px,auto)] xl:auto-rows-[minmax(150px,auto)] gap-3 xl:gap-3 px-0">
      <div className="row-span-3 box col-span-full sm:col-span-1 xl:col-span-1 3xl:row-span-5">
        <TopDealsBox />
      </div>
      <div className="box col-span-full sm:col-span-1 xl:col-span-1 3xl:row-span-2">
        <ChartBox
          chartType={'line'}
          IconBox={MdGroup}
          title="Nombre total de clients"
          {...queryGetTotalUsers.data}
          isLoading={queryGetTotalUsers.isLoading}
          isSuccess={queryGetTotalUsers.isSuccess}
        />
      </div>
      <div className="box col-span-full sm:col-span-1 xl:col-span-1 3xl:row-span-2">
        <ChartBox
          chartType={'line'}
          IconBox={MdInventory2}
          title="Articles traités"
          {...queryGetTotalProducts.data}
          isLoading={queryGetTotalProducts.isLoading}
          isSuccess={queryGetTotalProducts.isSuccess}
        />
      </div>
      <div className="row-span-3 box col-span-full sm:col-span-1 xl:col-span-1 3xl:row-span-5">
        <ChartBox
          chartType={'pie'}
          title="Origine des commandes"
          {...queryGetTotalSource.data}
          isLoading={queryGetTotalSource.isLoading}
          isSuccess={queryGetTotalSource.isSuccess}
        />
      </div>
      <div className="box col-span-full sm:col-span-1 xl:col-span-1 3xl:row-span-2">
        <ChartBox
          chartType={'line'}
          IconBox={MdAssessment}
          title="Taux de satisfaction"
          {...queryGetTotalRatio.data}
          isLoading={queryGetTotalRatio.isLoading}
          isSuccess={queryGetTotalRatio.isSuccess}
        />
      </div>
      <div className="box col-span-full sm:col-span-1 xl:col-span-1 3xl:row-span-2">
        <ChartBox
          chartType={'line'}
          IconBox={MdSwapHorizontalCircle}
          title="Revenus totaux"
          {...queryGetTotalRevenue.data}
          isLoading={queryGetTotalRevenue.isLoading}
          isSuccess={queryGetTotalRevenue.isSuccess}
        />
      </div>
      <div className="row-span-2 box col-span-full xl:col-span-2 3xl:row-span-3">
        <ChartBox
          chartType={'area'}
          title="Revenus par type d'article"
          {...queryGetTotalRevenueByProducts.data}
          isLoading={queryGetTotalRevenueByProducts.isLoading}
          isSuccess={queryGetTotalRevenueByProducts.isSuccess}
        />
      </div>
      <div className="box col-span-full sm:col-span-1 xl:col-span-1 3xl:row-span-2">
        <ChartBox
          chartType={'bar'}
          title="Nombre de visites"
          {...queryGetTotalVisit.data}
          isLoading={queryGetTotalVisit.isLoading}
          isSuccess={queryGetTotalVisit.isSuccess}
        />
      </div>
      <div className="box col-span-full sm:col-span-1 xl:col-span-1 3xl:row-span-2">
        <ChartBox
          chartType={'bar'}
          title="Bénéfices totaux"
          {...queryGetTotalProfit.data}
          isLoading={queryGetTotalProfit.isLoading}
          isSuccess={queryGetTotalProfit.isSuccess}
        />
      </div>
    </div>
  </div>
);
};

export default Home;
