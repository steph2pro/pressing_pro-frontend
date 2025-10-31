import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReportApi from "../../../data/datasources/ReportApi";
import { useState } from "react";
import { getStatisticsUseCase } from "../../../domain/usecases/reports/getStatisticsUseCase";

const reportApi = new ReportApi();

interface UseStatisticsParams {
  enabled?: boolean;
  params?: any;
}

export const useStatistics = (initialParams: UseStatisticsParams = {}) => {
  const [params, setParams] = useState<any>(initialParams.params || {});

  const query = useQuery({
    queryKey: ["statistics", params],
    queryFn: () => getStatisticsUseCase(reportApi, params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: initialParams.enabled !== false,
  });

  const updateParams = (newParams: any) => {
    setParams(prev => ({ ...prev, ...newParams }));
  };

  return {
    statistics: query.data?.data ?? [],
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