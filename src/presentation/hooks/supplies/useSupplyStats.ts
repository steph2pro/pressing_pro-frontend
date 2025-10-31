import { useQuery } from "@tanstack/react-query";
import SupplyApi from "../../../data/datasources/SupplyApi";
import { getSuppliesUseCase } from "../../../domain/usecases/supplies";

const supplyApi = new SupplyApi();

export const useSupplyStats = () => {
  const { data: suppliesData } = useQuery({
    queryKey: ["supplies", "stats"],
    queryFn: () => getSuppliesUseCase(supplyApi, { limit: 1000 }),
    staleTime: 1000 * 60 * 10,
  });

  const supplies = suppliesData?.data ?? [];

  const stats = {
    total: supplies.length,
    draft: supplies.filter(s => s.statut === 'draft').length,
    confirmed: supplies.filter(s => s.statut === 'confirmed').length,
    delivered: supplies.filter(s => s.statut === 'delivered').length,
    cancelled: supplies.filter(s => s.statut === 'cancelled').length,
    totalAmount: supplies.reduce((sum, s) => sum + s.total, 0),
    averageAmount: supplies.length > 0 ? supplies.reduce((sum, s) => sum + s.total, 0) / supplies.length : 0,
  };

  return {
    stats,
    isLoading: !suppliesData,
  };
};