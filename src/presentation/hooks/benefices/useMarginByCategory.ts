import { useQuery } from "@tanstack/react-query";
import BeneficeApi from "../../../data/datasources/BeneficeApi";
import { getMarginByCategoryUseCase } from "../../../domain/usecases/benefices/getMarginByCategoryUseCase";
import { AnalyseBeneficeRequest } from "../../../data/models/benefice";

const reportApi = new BeneficeApi();

interface UseMarginByCategoryParams {
  enabled?: boolean;
  params?: AnalyseBeneficeRequest;
}

export const useMarginByCategory = (params: UseMarginByCategoryParams = {}) => {
  const query = useQuery({
    queryKey: ["margin-by-category", params],
    queryFn: () => getMarginByCategoryUseCase(reportApi, params.params!),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: params.enabled !== false && !!params.params,
  });

  return {
    marginByCategory: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};