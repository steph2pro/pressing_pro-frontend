import { useQuery } from "@tanstack/react-query";
import ExpenseApi from "../../../data/datasources/ExpenseApi";
import { getExpenseByIdUseCase } from "../../../domain/usecases/expensives/getExpenseByIdUseCase";

const expenseApi = new ExpenseApi();

interface UseExpenseByIdParams {
  enabled?: boolean;
}

export const useExpenseById = (id: number, params: UseExpenseByIdParams = {}) => {
  const query = useQuery({
    queryKey: ["expense", id],
    queryFn: () => getExpenseByIdUseCase(id, expenseApi),
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: params.enabled !== false && !!id,
  });

  return {
    expense: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};