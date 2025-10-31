import { useQuery } from "@tanstack/react-query";
import UserApi from "../../../data/datasources/UserApi";
import { getUserStatisticsUseCase } from "../../../domain/usecases/users/getUserStatisticsUseCase";
const userApi = new UserApi();

interface UseUserStatisticsParams {
  enabled?: boolean;
}

export const useUserStatistics = (params: UseUserStatisticsParams = {}) => {
  const query = useQuery({
    queryKey: ["user-statistics"],
    queryFn: () => getUserStatisticsUseCase(userApi),
    staleTime: 1000 * 60 * 10,
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