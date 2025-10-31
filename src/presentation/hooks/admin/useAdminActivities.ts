import { useQuery } from "@tanstack/react-query";
import AdminApi from "../../../data/datasources/AdminApi";
import { getAdminActivitiesUseCase } from "../../../domain/usecases/admin/getAdminActivitiesUseCase";
import { AdminActivitySearchParams } from "../../../data/models/admin";

const userApi = new AdminApi();

interface UseAdminActivitiesParams {
  enabled?: boolean;
  params?: AdminActivitySearchParams;
}

export const useAdminActivities = (params: UseAdminActivitiesParams = {}) => {
  const query = useQuery({
    queryKey: ["admin-activities", params],
    queryFn: () => getAdminActivitiesUseCase(userApi, params.params),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: params.enabled !== false,
  });

  return {
    activities: query.data?.data ?? [],
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