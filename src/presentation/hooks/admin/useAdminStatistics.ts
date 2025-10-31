import { useQuery } from "@tanstack/react-query";
import AdminApi from "../../../data/datasources/AdminApi";
import { getAdminStatisticsUseCase } from "../../../domain/usecases/admin/getAdminStatisticsUseCase";

const userApi = new AdminApi();

interface UseAdminStatisticsParams {
  enabled?: boolean;
}

export const useAdminStatistics = (params: UseAdminStatisticsParams = {}) => {
  const query = useQuery({
    queryKey: ["admin-statistics"],
    queryFn: () => getAdminStatisticsUseCase(userApi),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: params.enabled !== false,
  });

  return {
    statistics: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};