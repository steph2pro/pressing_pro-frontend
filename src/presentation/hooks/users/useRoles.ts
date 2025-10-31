import { useQuery } from "@tanstack/react-query";
import UserApi from "../../../data/datasources/UserApi";
import { getRolesUseCase } from "../../../domain/usecases/users/getRolesUseCase";
import { RoleSearchParams } from "../../../data/models/users";

const userApi = new UserApi();

interface UseRolesParams {
  enabled?: boolean;
  params?: RoleSearchParams;
}

export const useRoles = (params: UseRolesParams = {}) => {
  const query = useQuery({
    queryKey: ["roles", params],
    queryFn: () => getRolesUseCase(userApi, params.params),
    staleTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: params.enabled !== false,
  });

  return {
    roles: query.data?.data ?? [],
    total: query.data?.total ?? 0,
    page: query.data?.page ?? 1,
    limit: query.data?.limit ?? 10,
    pages: query.data?.pages ?? 1,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};