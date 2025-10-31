import { useQuery } from "@tanstack/react-query";
import SalesApi from "../../../data/datasources/SalesApi";
import { getFactureByIdUseCase } from "../../../domain/usecases/sales/getFactureByIdUseCase";
import { Facture } from "../../../data/models/sales";

const salesApi = new SalesApi();

export const useFactureById = (id: number | null) => {
  const query = useQuery({
    queryKey: ["facture", id],
    queryFn: () => {
      if (!id) throw new Error("ID facture requis");
      return getFactureByIdUseCase(id, salesApi);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
  });

  return {
    facture: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};