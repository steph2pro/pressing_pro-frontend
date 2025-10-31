import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NotificationApi from "../../../data/datasources/NotificationApi";
import { NotificationSearchParams } from "../../../data/models/notifications";
import { useState } from "react";
import { getNotificationsUseCase } from "../../../domain/usecases/notifications/getNotificationsUseCase";

const notificationApi = new NotificationApi();

interface UseNotificationsParams extends NotificationSearchParams {
  enabled?: boolean;
}

export const useNotifications = (initialParams: UseNotificationsParams = {}) => {
  const [params, setParams] = useState<NotificationSearchParams>(initialParams);

  const query = useQuery({
    queryKey: ["notifications", params],
    queryFn: () => getNotificationsUseCase(notificationApi, params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 2, // 2 minutes (données fréquemment mises à jour)
    retry: 1,
    refetchOnWindowFocus: true,
    enabled: initialParams.enabled !== false,
  });

  const updateParams = (newParams: Partial<NotificationSearchParams>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  };

  return {
    notifications: query.data?.data ?? [],
    total: query.data?.total ?? 0,
    page: query.data?.page ?? 1,
    limit: query.data?.limit ?? 10,
    pages: query.data?.pages ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    updateParams,
    params,
  };
};