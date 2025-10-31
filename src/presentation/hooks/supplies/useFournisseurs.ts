import { useQuery } from "@tanstack/react-query";
import SupplyApi from "../../../data/datasources/SupplyApi";
import { getFournisseursUseCase } from "../../../domain/usecases/supplies";
import { Fournisseur } from "../../../data/models/supplies";

const supplyApi = new SupplyApi();

export const useFournisseurs = () => {
  const query = useQuery({
    queryKey: ["fournisseurs"],
    queryFn: () => getFournisseursUseCase(supplyApi),
    staleTime: 1000 * 60 * 30, // 30 minutes (les fournisseurs changent rarement)
    retry: 1,
  });

  return {
    fournisseurs: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};