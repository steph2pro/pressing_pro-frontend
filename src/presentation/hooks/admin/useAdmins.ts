import { useQuery } from "@tanstack/react-query";
import AdminApi from "../../../data/datasources/AdminApi";
import { getAdminsUseCase } from "../../../domain/usecases/admin/getAdminsUseCase";

const userApi = new AdminApi();

interface UseAdminsParams {
  enabled?: boolean;
}

export const useAdmins = (params: UseAdminsParams = {}) => {
  const query = useQuery({
    queryKey: ["admins"],
    queryFn: () => getAdminsUseCase(userApi),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: params.enabled !== false,
  });

  return {
    admins: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};