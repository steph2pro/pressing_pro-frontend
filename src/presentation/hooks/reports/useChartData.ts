import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReportApi from "../../../data/datasources/ReportApi";
import { GraphiqueRequest } from "../../../data/models/reports";
import { useState } from "react";
import { getChartDataUseCase } from "../../../domain/usecases/reports/getChartDataUseCase";

const reportApi = new ReportApi();

interface UseChartDataParams extends GraphiqueRequest {
  enabled?: boolean;
  
}

export const useChartData = (initialParams: UseChartDataParams = { metrique: 'chiffre_affaire' }) => {
  const [params, setParams] = useState<GraphiqueRequest>(initialParams);

  const query = useQuery({
    queryKey: ["chartData", params],
    queryFn: () => getChartDataUseCase(params, reportApi),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: initialParams.enabled !== false,
  });

  const updateParams = (newParams: Partial<GraphiqueRequest>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  };

  return {
    chartData: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    updateParams,
    params,
  };
};