import AuditApi from '../../../data/datasources/AuditApi';
import toast from 'react-hot-toast';

export const exportAuditLogsUseCase = async (
  params: any,
  auditApi: AuditApi
): Promise<Blob> => {
  try {
    const response = await auditApi.exportAuditLogs(params);
    toast.success('✅ Logs d\'audit exportés avec succès !');
    return response;
  } catch (error: any) {
    console.error("Erreur lors de l'export des logs d'audit :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};