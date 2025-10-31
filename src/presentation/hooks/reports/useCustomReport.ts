import { useState } from 'react';
import { CustomRapportRequest } from '../../../data/models/reports';
import ReportApi from '../../../data/datasources/ReportApi';
import { generateCustomReportUseCase } from '../../../domain/usecases/reports/generateCustomReportUseCase';

export const useCustomReport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<any | null>(null);
  const reportApi = new ReportApi();

  const generateCustomReport = async (params: CustomRapportRequest): Promise<any | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setData(null);
    
    try {
      const response = await generateCustomReportUseCase(params, reportApi);
      setData(response);
      setSuccess(true);
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la génération du rapport personnalisé');
      console.error('Erreur lors de la génération :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    generateCustomReport,
    data,
    loading,
    error,
    success,
  };
};