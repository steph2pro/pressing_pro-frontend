import { RapportRequest, RapportVentesResponse } from '../../../data/models/reports';
import ReportApi from '../../../data/datasources/ReportApi';
import toast from 'react-hot-toast';

export const generateSalesReportUseCase = async (
  params: RapportRequest,
  reportApi: ReportApi
): Promise<RapportVentesResponse> => {
  try {
    const response = await reportApi.generateSalesReport(params);
    toast.success('✅ Rapport de ventes généré avec succès !');
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la génération du rapport de ventes :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};