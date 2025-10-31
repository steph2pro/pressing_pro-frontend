import { useQuery } from "@tanstack/react-query";
import BeneficeApi from "../../../data/datasources/BeneficeApi";
import { calculateBreakEvenUseCase } from "../../../domain/usecases/benefices/calculateBreakEvenUseCase";
import { AnalyseBeneficeRequest } from "../../../data/models/benefice";

const reportApi = new BeneficeApi();

interface UseBreakEvenAnalysisParams {
  enabled?: boolean;
  params?: AnalyseBeneficeRequest;
}

export const useBreakEvenAnalysis = (params: UseBreakEvenAnalysisParams = {}) => {
  const query = useQuery({
    queryKey: ["break-even-analysis", params],
    queryFn: () => calculateBreakEvenUseCase(reportApi, params.params!),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: params.enabled !== false && !!params.params,
  });

  return {
    breakEvenData: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};