import { useQuery } from "@tanstack/react-query";
import NotificationApi from "../../../data/datasources/NotificationApi";
import { getUnreadCountUseCase } from "../../../domain/usecases/notifications/getUnreadCountUseCase";

const notificationApi = new NotificationApi();

interface UseUnreadCountParams {
  enabled?: boolean;
  refetchInterval?: number;
}

export const useUnreadCount = (params: UseUnreadCountParams = {}) => {
  const query = useQuery({
    queryKey: ["unreadCount"],
    queryFn: () => getUnreadCountUseCase(notificationApi),
    staleTime: 1000 * 30, // 30 secondes (données fréquemment mises à jour)
    retry: 1,
    refetchOnWindowFocus: true,
    refetchInterval: params.refetchInterval, // Optionnel : rafraîchissement automatique
    enabled: params.enabled !== false,
  });

  return {
    unreadCount: query.data?.data ?? { total: 0, parPriorite: { urgente: 0, haute: 0, moyenne: 0, basse: 0 } },
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};