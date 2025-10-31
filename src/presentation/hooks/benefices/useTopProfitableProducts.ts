import { useQuery } from "@tanstack/react-query";
import BeneficeApi from "../../../data/datasources/BeneficeApi";
import { getTopProfitableProductsUseCase } from "../../../domain/usecases/benefices/getTopProfitableProductsUseCase";
import { AnalyseBeneficeRequest } from "../../../data/models/benefice";

const reportApi = new BeneficeApi();

interface UseTopProfitableProductsParams {
  enabled?: boolean;
  params?: AnalyseBeneficeRequest;
}

export const useTopProfitableProducts = (params: UseTopProfitableProductsParams = {}) => {
  const query = useQuery({
    queryKey: ["top-profitable-products", params],
    queryFn: () => getTopProfitableProductsUseCase(reportApi, params.params!),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: params.enabled !== false && !!params.params,
  });

  return {
    topProfitableProducts: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};