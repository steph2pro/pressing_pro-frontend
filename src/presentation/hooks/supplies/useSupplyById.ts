import { useQuery } from "@tanstack/react-query";
import SupplyApi from "../../../data/datasources/SupplyApi";
import { Approvisionnement } from "../../../data/models/supplies";
import { getSupplyByIdUseCase } from "../../../domain/usecases/supplies";

const supplyApi = new SupplyApi();

export const useSupplyById = (id: number | null) => {
  const query = useQuery({
    queryKey: ["supply", id],
    queryFn: () => {
      if (!id) throw new Error("ID approvisionnement requis");
      return getSupplyByIdUseCase(id, supplyApi);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
  });

  return {
    supply: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};