import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ExpenseApi from "../../../data/datasources/ExpenseApi";
import { DepenseSearchParams } from "../../../data/models/expenses";
import { useState } from "react";
import { getExpensesUseCase } from "../../../domain/usecases/expensives/getExpensesUseCase";

const expenseApi = new ExpenseApi();

interface UseExpensesParams extends DepenseSearchParams {
  enabled?: boolean;
}

export const useExpenses = (initialParams: UseExpensesParams = {}) => {
  const [params, setParams] = useState<DepenseSearchParams>(initialParams);

  const query = useQuery({
    queryKey: ["expenses", params],
    queryFn: () => getExpensesUseCase(expenseApi, params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: initialParams.enabled !== false,
  });

  const updateParams = (newParams: Partial<DepenseSearchParams>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  };

  return {
    expenses: query.data?.data ?? [],
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