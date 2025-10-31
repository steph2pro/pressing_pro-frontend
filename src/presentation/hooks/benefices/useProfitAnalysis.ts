import { useQuery } from "@tanstack/react-query";
import BeneficeApi from "../../../data/datasources/BeneficeApi";
import { getProfitAnalysisUseCase } from "../../../domain/usecases/benefices/getProfitAnalysisUseCase";
import { AnalyseBeneficeRequest } from "../../../data/models/benefice";

const reportApi = new BeneficeApi();

interface UseProfitAnalysisParams {
  enabled?: boolean;
  params?: AnalyseBeneficeRequest;
}

export const useProfitAnalysis = (params: UseProfitAnalysisParams = {}) => {
  const query = useQuery({
    queryKey: ["profit-analysis", params],
    queryFn: () => getProfitAnalysisUseCase(reportApi, params.params!),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: params.enabled !== false && !!params.params,
  });

  return {
    profitData: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};