import { useState } from 'react';
import ReportApi from '../../../data/datasources/ReportApi';
import { exportReportUseCase } from '../../../domain/usecases/reports/exportReportUseCase';

export const useExportReport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const reportApi = new ReportApi();

  const exportReport = async (params: any): Promise<Blob | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await exportReportUseCase(params, reportApi);
      setSuccess(true);
      
      // Téléchargement automatique du fichier
      const url = window.URL.createObjectURL(response);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `rapport-${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'export du rapport');
      console.error('Erreur lors de l\'export :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    exportReport,
    loading,
    error,
    success,
  };
};