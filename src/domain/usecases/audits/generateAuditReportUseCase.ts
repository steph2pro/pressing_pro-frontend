import { RapportAudit } from '../../../data/models/audit';
import AuditApi from '../../../data/datasources/AuditApi';
import toast from 'react-hot-toast';

export const generateAuditReportUseCase = async (
  params: any,
  auditApi: AuditApi
): Promise<RapportAudit> => {
  try {
    const response = await auditApi.generateAuditReport(params);
    toast.success('✅ Rapport d\'audit généré avec succès !');
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la génération du rapport d'audit :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};