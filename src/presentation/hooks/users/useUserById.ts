import { useQuery } from "@tanstack/react-query";
import UserApi from "../../../data/datasources/UserApi";
import { getUserByIdUseCase } from "../../../domain/usecases/users/getUserByIdUseCase";
import { User } from "../../../data/models/users";

const userApi = new UserApi();

export const useUserById = (id: number | null) => {
  const query = useQuery({
    queryKey: ["user", id],
    queryFn: () => {
      if (!id) throw new Error("ID utilisateur requis");
      return getUserByIdUseCase(id, userApi);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
  });

  return {
    user: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};