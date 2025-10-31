import { useQuery } from "@tanstack/react-query";
import SalesApi from "../../../data/datasources/SalesApi";
import { getSaleByIdUseCase } from "../../../domain/usecases/sales/getSaleByIdUseCase";

const salesApi = new SalesApi();

export const useVenteById = (id: number | null) => {
  const query = useQuery({
    queryKey: ["vente", id],
    queryFn: () => {
      if (!id) throw new Error("ID vente requis");
      return getSaleByIdUseCase(id, salesApi);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
  });

  return {
    vente: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};