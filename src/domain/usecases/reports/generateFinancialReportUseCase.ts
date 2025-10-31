import { RapportRequest, RapportFinancierResponse } from '../../../data/models/reports';
import ReportApi from '../../../data/datasources/ReportApi';
import toast from 'react-hot-toast';

export const generateFinancialReportUseCase = async (
  params: RapportRequest,
  reportApi: ReportApi
): Promise<RapportFinancierResponse> => {
  try {
    const response = await reportApi.generateFinancialReport(params);
    toast.success('✅ Rapport financier généré avec succès !');
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la génération du rapport financier :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};