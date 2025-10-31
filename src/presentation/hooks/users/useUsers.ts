import { keepPreviousData, useQuery } from "@tanstack/react-query";
import UserApi from "../../../data/datasources/UserApi";
import { getUsersUseCase } from "../../../domain/usecases/users/getUsersUseCase";
import { User, UserSearchParams } from "../../../data/models/users";
import { useState } from "react";

const userApi = new UserApi();

interface UseUsersParams extends UserSearchParams {
  enabled?: boolean;
}

export const useUsers = (initialParams: UseUsersParams = {}) => {
  const [params, setParams] = useState<UserSearchParams>(initialParams);

  const query = useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsersUseCase(userApi, params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: initialParams.enabled !== false,
  });

  const updateParams = (newParams: Partial<UserSearchParams>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  };

  return {
    users: query.data?.data ?? [],
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