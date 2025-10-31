import { useQuery } from "@tanstack/react-query";
import ProductApi from "../../../data/datasources/ProductApi";
import { getCategoriesUseCase } from "../../../domain/usecases/products";

const productApi = new ProductApi();

interface UseCategoriesParams {
  enabled?: boolean;
}

export const useCategories = (params: UseCategoriesParams = {}) => {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoriesUseCase(productApi),
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: params.enabled !== false,
  });

  return {
    categories: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};