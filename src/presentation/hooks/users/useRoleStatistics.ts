import { useQuery } from "@tanstack/react-query";
import UserApi from "../../../data/datasources/UserApi";
import { getRoleStatisticsUseCase } from "../../../domain/usecases/users/getRoleStatisticsUseCase";

const userApi = new UserApi();

interface UseRoleStatisticsParams {
  enabled?: boolean;
}

export const useRoleStatistics = (params: UseRoleStatisticsParams = {}) => {
  const query = useQuery({
    queryKey: ["role-statistics"],
    queryFn: () => getRoleStatisticsUseCase(userApi),
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