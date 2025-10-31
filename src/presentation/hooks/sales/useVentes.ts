import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SalesApi from "../../../data/datasources/SalesApi";
import { Vente, VenteSearchParams } from "../../../data/models/sales";
import { useState } from "react";
import { getSalesUseCase } from "../../../domain/usecases/sales/getSalesUseCase";

const salesApi = new SalesApi();

interface UseVentesParams extends VenteSearchParams {
  enabled?: boolean;
}

export const useVentes = (initialParams: UseVentesParams = {}) => {
  const [params, setParams] = useState<VenteSearchParams>(initialParams);

  const query = useQuery({
    queryKey: ["ventes", params],
    queryFn: () => getSalesUseCase(salesApi, params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 2, // 2 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: initialParams.enabled !== false,
  });

  const updateParams = (newParams: Partial<VenteSearchParams>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  };

  return {
    ventes: query.data?.data ?? [],
    total: query.data?.total ?? 0,
    page: query.data?.page ?? 1,
    limit: query.data?.limit ?? 10,
    pages: query.data?.pages ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    updateParams,
    params,
  };
};