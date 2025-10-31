import { ActionLogListResponse, LogSearchParams } from '../../../data/models/audit';
import AuditApi from '../../../data/datasources/AuditApi';

export const getActionLogsUseCase = async (
  auditApi: AuditApi,
  params?: LogSearchParams
): Promise<ActionLogListResponse> => {
  try {
    const response = await auditApi.getActionLogs(params);
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des logs d'activité :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    throw new Error(message);
  }
};