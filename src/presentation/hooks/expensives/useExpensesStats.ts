import { useQuery } from "@tanstack/react-query";
import ExpenseApi from "../../../data/datasources/ExpenseApi";
import { getExpensesStatsUseCase } from "../../../domain/usecases/expensives/getExpensesStatsUseCase";

const expenseApi = new ExpenseApi();

interface UseExpensesStatsParams {
  enabled?: boolean;
}

export const useExpensesStats = (params: UseExpensesStatsParams = {}) => {
  const query = useQuery({
    queryKey: ["expensesStats"],
    queryFn: () => getExpensesStatsUseCase(expenseApi),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: params.enabled !== false,
  });

  return {
    stats: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};