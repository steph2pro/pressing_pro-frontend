import { useQuery } from "@tanstack/react-query";
import NotificationApi from "../../../data/datasources/NotificationApi";
import { getAlertConfigurationsUseCase } from "../../../domain/usecases/notifications/getAlertConfigurationsUseCase";

const notificationApi = new NotificationApi();

interface UseAlertConfigurationsParams {
  enabled?: boolean;
}

export const useAlertConfigurations = (params: UseAlertConfigurationsParams = {}) => {
  const query = useQuery({
    queryKey: ["alertConfigurations"],
    queryFn: () => getAlertConfigurationsUseCase(notificationApi),
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: params.enabled !== false,
  });

  return {
    alertConfigurations: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};