import { useQuery } from "@tanstack/react-query";
import UserApi from "../../../data/datasources/UserApi";
import { getPermissionsUseCase } from "../../../domain/usecases/users/getPermissionsUseCase";

const userApi = new UserApi();

interface UsePermissionsParams {
  enabled?: boolean;
}

export const usePermissions = (params: UsePermissionsParams = {}) => {
  const query = useQuery({
    queryKey: ["permissions"],
    queryFn: () => getPermissionsUseCase(userApi),
    staleTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: params.enabled !== false,
  });

  return {
    permissions: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};