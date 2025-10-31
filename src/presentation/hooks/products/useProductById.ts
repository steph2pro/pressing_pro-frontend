import { useQuery } from "@tanstack/react-query";
import ProductApi from "../../../data/datasources/ProductApi";
import { getProductByIdUseCase } from "../../../domain/usecases/products";

const productApi = new ProductApi();

interface UseProductByIdParams {
  enabled?: boolean;
}

export const useProductById = (id: number, params: UseProductByIdParams = {}) => {
  const query = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductByIdUseCase(id, productApi),
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: params.enabled !== false && !!id,
  });

  return {
    product: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};