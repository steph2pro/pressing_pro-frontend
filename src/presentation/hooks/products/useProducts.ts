import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ProductApi from "../../../data/datasources/ProductApi";
import { ProduitSearchParams } from "../../../data/models/products";
import { useState } from "react";
import { getProductsUseCase } from "../../../domain/usecases/products";

const productApi = new ProductApi();

interface UseProductsParams extends ProduitSearchParams {
  enabled?: boolean;
}

export const useProducts = (initialParams: UseProductsParams = {}) => {
  const [params, setParams] = useState<ProduitSearchParams>(initialParams);

  const query = useQuery({
    queryKey: ["products", params],
    queryFn: () => getProductsUseCase( params ,productApi),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: initialParams.enabled !== false,
  });

  const updateParams = (newParams: Partial<ProduitSearchParams>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  };

  return {
    products: query.data?.data ?? [],
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