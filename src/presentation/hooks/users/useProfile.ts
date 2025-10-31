import { useQuery } from "@tanstack/react-query";
import UserApi from "../../../data/datasources/UserApi";
import { getProfileUseCase } from "../../../domain/usecases/users/getProfileUseCase";
import { User } from "../../../data/models/users";

const userApi = new UserApi();

export const useProfile = () => {
  const query = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfileUseCase(userApi),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });

  return {
    profile: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};