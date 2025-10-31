import { useQuery } from "@tanstack/react-query";
import ReportApi from "../../../data/datasources/ReportApi";
import { getTopProductsUseCase } from "../../../domain/usecases/reports/getTopProductsUseCase";

const reportApi = new ReportApi();

interface UseTopProductsParams {
  enabled?: boolean;
}

export const useTopProducts = (params: UseTopProductsParams = {}) => {
  const query = useQuery({
    queryKey: ["topProducts"],
    queryFn: () => getTopProductsUseCase(reportApi),
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: params.enabled !== false,
  });

  return {
    topProducts: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};