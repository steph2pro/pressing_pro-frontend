import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SalesApi from "../../../data/datasources/SalesApi";
import { getFacturesUseCase } from "../../../domain/usecases/sales/getFacturesUseCase";
import { Facture, FactureSearchParams } from "../../../data/models/sales";
import { useState } from "react";

const salesApi = new SalesApi();

interface UseFacturesParams extends FactureSearchParams {
  enabled?: boolean;
}

export const useFactures = (initialParams: UseFacturesParams = {}) => {
  const [params, setParams] = useState<FactureSearchParams>(initialParams);

  const query = useQuery({
    queryKey: ["factures", params],
    queryFn: () => getFacturesUseCase(salesApi, params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: initialParams.enabled !== false,
  });

  const updateParams = (newParams: Partial<FactureSearchParams>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  };

  return {
    factures: query.data?.data ?? [],
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