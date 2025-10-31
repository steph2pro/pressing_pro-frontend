import { useQuery } from "@tanstack/react-query";
import NotificationApi from "../../../data/datasources/NotificationApi";
import { getNotificationByIdUseCase } from "../../../domain/usecases/notifications/getNotificationByIdUseCase";
const notificationApi = new NotificationApi();

interface UseNotificationByIdParams {
  enabled?: boolean;
}

export const useNotificationById = (id: number, params: UseNotificationByIdParams = {}) => {
  const query = useQuery({
    queryKey: ["notification", id],
    queryFn: () => getNotificationByIdUseCase(id, notificationApi),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: params.enabled !== false && !!id,
  });

  return {
    notification: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};