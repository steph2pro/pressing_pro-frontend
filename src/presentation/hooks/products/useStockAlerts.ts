import { useQuery } from "@tanstack/react-query";
import ProductApi from "../../../data/datasources/ProductApi";
import { getStockAlertsUseCase } from "../../../domain/usecases/products";

const productApi = new ProductApi();

interface UseStockAlertsParams {
  enabled?: boolean;
}

export const useStockAlerts = (params: UseStockAlertsParams = {}) => {
  const query = useQuery({
    queryKey: ["stockAlerts"],
    queryFn: () => getStockAlertsUseCase(productApi),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: true, // Rafraîchir automatiquement pour les alertes
    enabled: params.enabled !== false,
  });

  return {
    stockAlerts: query.data?.data ?? [],
    total: query.data?.total ?? 0,
    page: query.data?.page ?? 1,
    limit: query.data?.limit ?? 10,
    pages: query.data?.pages ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};