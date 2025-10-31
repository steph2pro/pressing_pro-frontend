import { keepPreviousData, useQuery } from "@tanstack/react-query";
import AuditApi from "../../../data/datasources/AuditApi";
import { LogSearchParams } from "../../../data/models/audit";
import { useState } from "react";
import { getActionLogsUseCase } from "../../../domain/usecases/audits/getActionLogsUseCase";

const auditApi = new AuditApi();

interface UseActionLogsParams extends LogSearchParams {
  enabled?: boolean;
}

export const useActionLogs = (initialParams: UseActionLogsParams = {}) => {
  const [params, setParams] = useState<LogSearchParams>(initialParams);

  const query = useQuery({
    queryKey: ["actionLogs", params],
    queryFn: () => getActionLogsUseCase(auditApi, params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10, // 10 minutes (données d'audit moins fréquemment mises à jour)
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: initialParams.enabled !== false,
  });

  const updateParams = (newParams: Partial<LogSearchParams>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  };

  return {
    actionLogs: query.data?.data ?? [],
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