import { useQuery } from "@tanstack/react-query";
import ReportApi from "../../../data/datasources/ReportApi";
import { getPerformanceByCategoryUseCase } from "../../../domain/usecases/reports/getPerformanceByCategoryUseCase";
const reportApi = new ReportApi();

interface UsePerformanceByCategoryParams {
  enabled?: boolean;
}

export const usePerformanceByCategory = (params: UsePerformanceByCategoryParams = {}) => {
  const query = useQuery({
    queryKey: ["performanceByCategory"],
    queryFn: () => getPerformanceByCategoryUseCase(reportApi),
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: params.enabled !== false,
  });

  return {
    performanceByCategory: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};