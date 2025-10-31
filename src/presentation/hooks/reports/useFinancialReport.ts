import { useState } from 'react';
import { RapportRequest, RapportFinancierResponse } from '../../../data/models/reports';
import ReportApi from '../../../data/datasources/ReportApi';
import { generateFinancialReportUseCase } from '../../../domain/usecases/reports/generateFinancialReportUseCase';

export const useFinancialReport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<RapportFinancierResponse | null>(null);
  const reportApi = new ReportApi();

  const generateFinancialReport = async (params: RapportRequest): Promise<RapportFinancierResponse | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setData(null);
    
    try {
      const response = await generateFinancialReportUseCase(params, reportApi);
      setData(response);
      setSuccess(true);
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la génération du rapport financier');
      console.error('Erreur lors de la génération :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    generateFinancialReport,
    data,
    loading,
    error,
    success,
  };
};