
import toast from 'react-hot-toast';
import ReportApi from '../../../data/datasources/ReportApi';

export const exportReportUseCase = async (
  params: any,
  reportApi: ReportApi
): Promise<Blob> => {
  try {
    const response = await reportApi.exportReport(params);
    toast.success('✅ Rapport exporté avec succès !');
    return response;
  } catch (error: any) {
    console.error("Erreur lors de l'export du rapport :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};