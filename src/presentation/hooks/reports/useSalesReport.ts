import { useState } from 'react';
import { RapportRequest, RapportVentesResponse } from '../../../data/models/reports';
import ReportApi from '../../../data/datasources/ReportApi';
import { generateSalesReportUseCase } from '../../../domain/usecases/reports/generateSalesReportUseCase';

export const useSalesReport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<RapportVentesResponse | null>(null);
  const reportApi = new ReportApi();

  const generateSalesReport = async (params: RapportRequest): Promise<RapportVentesResponse | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setData(null);
    
    try {
      const response = await generateSalesReportUseCase(params, reportApi);
      setData(response);
      setSuccess(true);
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la génération du rapport de ventes');
      console.error('Erreur lors de la génération :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    generateSalesReport,
    data,
    loading,
    error,
    success,
  };
};