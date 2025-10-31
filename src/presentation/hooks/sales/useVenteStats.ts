import { useQuery } from "@tanstack/react-query";
import SalesApi from "../../../data/datasources/SalesApi";
import { getSalesStatsUseCase } from "../../../domain/usecases/sales/getVenteStatsUseCase";

const salesApi = new SalesApi();

interface UseVenteStatsParams {
  dateDebut?: Date;
  dateFin?: Date;
  enabled?: boolean;
}

export const useVenteStats = (params: UseVenteStatsParams = {}) => {
  const query = useQuery({
    queryKey: ["vente-stats", params.dateDebut, params.dateFin],
    queryFn: () => getSalesStatsUseCase(salesApi, params.dateDebut, params.dateFin),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: params.enabled !== false,
  });

  return {
    stats: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};