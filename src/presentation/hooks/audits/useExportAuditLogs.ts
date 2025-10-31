import { useState } from 'react';
import AuditApi from '../../../data/datasources/AuditApi';
import { exportAuditLogsUseCase } from '../../../domain/usecases/audits/exportAuditLogsUseCase';

export const useExportAuditLogs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const auditApi = new AuditApi();

  const exportAuditLogs = async (params: any): Promise<Blob | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await exportAuditLogsUseCase(params, auditApi);
      setSuccess(true);
      
      // Téléchargement automatique du fichier
      const url = window.URL.createObjectURL(response);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `audit-logs-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'export des logs d\'audit');
      console.error('Erreur lors de l\'export :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    exportAuditLogs,
    loading,
    error,
    success,
  };
};