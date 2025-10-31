import { useQuery } from "@tanstack/react-query";
import UserApi from "../../../data/datasources/UserApi";
import { getRoleByIdUseCase } from "../../../domain/usecases/users/getRoleByIdUseCase";

const userApi = new UserApi();

interface UseRoleByIdParams {
  id: number;
  enabled?: boolean;
}

export const useRoleById = (params: UseRoleByIdParams) => {
  const query = useQuery({
    queryKey: ["role", params.id],
    queryFn: () => getRoleByIdUseCase(userApi, params.id),
    staleTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: params.enabled !== false && !!params.id,
  });

  return {
    role: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};