import { CustomRapportRequest } from '../../../data/models/reports';
import ReportApi from '../../../data/datasources/ReportApi';
import toast from 'react-hot-toast';

export const generateCustomReportUseCase = async (
  params: CustomRapportRequest,
  reportApi: ReportApi
): Promise<any> => {
  try {
    const response = await reportApi.generateCustomReport(params);
    toast.success('✅ Rapport personnalisé généré avec succès !');
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la génération du rapport personnalisé :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};