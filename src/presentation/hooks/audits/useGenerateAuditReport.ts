import { useState } from 'react';
import { RapportAudit } from '../../../data/models/audit';
import AuditApi from '../../../data/datasources/AuditApi';
import { generateAuditReportUseCase } from '../../../domain/usecases/audits/generateAuditReportUseCase';

export const useGenerateAuditReport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<RapportAudit | null>(null);
  const auditApi = new AuditApi();

  const generateAuditReport = async (params: any): Promise<RapportAudit | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setData(null);
    
    try {
      const response = await generateAuditReportUseCase(params, auditApi);
      setData(response);
      setSuccess(true);
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la génération du rapport d\'audit');
      console.error('Erreur lors de la génération :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    generateAuditReport,
    data,
    loading,
    error,
    success,
  };
};