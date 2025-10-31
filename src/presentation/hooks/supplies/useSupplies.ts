import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SupplyApi from "../../../data/datasources/SupplyApi";
import { getSuppliesUseCase } from "../../../domain/usecases/supplies";
import { Approvisionnement, ApprovisionnementSearchParams } from "../../../data/models/supplies";
import { useState } from "react";

const supplyApi = new SupplyApi();

interface UseSuppliesParams extends ApprovisionnementSearchParams {
  enabled?: boolean;
}

export const useSupplies = (initialParams: UseSuppliesParams = {}) => {
  const [params, setParams] = useState<ApprovisionnementSearchParams>(initialParams);

  const query = useQuery({
    queryKey: ["supplies", params],
    queryFn: () => getSuppliesUseCase(supplyApi, params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: initialParams.enabled !== false,
  });

  const updateParams = (newParams: Partial<ApprovisionnementSearchParams>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  };

  return {
    supplies: query.data?.data ?? [],
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