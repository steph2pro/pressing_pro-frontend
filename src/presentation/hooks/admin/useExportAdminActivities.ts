import { useState } from 'react';
import AdminApi from '../../../data/datasources/AdminApi';
import { useMutation } from '@tanstack/react-query';
import { exportAdminActivitiesUseCase } from '../../../domain/usecases/admin/exportAdminActivitiesUseCase';
import { AdminActivitySearchParams } from '../../../data/models/admin';

const userApi = new AdminApi();

export const useExportAdminActivities = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const mutation = useMutation<
    Blob,
    Error,
    AdminActivitySearchParams
  >({
    mutationFn: (params: AdminActivitySearchParams) => 
      exportAdminActivitiesUseCase(userApi, params),
    onMutate: () => {
      setLoading(true);
      setError(null);
      setSuccess(false);
    },
    onSuccess: (data) => {
      setSuccess(true);
      // Télécharger le fichier
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'activites-administrateurs.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
    onError: (err: any) => {
      setError(err.message || 'Erreur lors de l\'export');
    },
    onSettled: () => {
      setLoading(false);
    }
  });

  return {
    exportActivities: mutation.mutate,
    loading: mutation.isPending,
    error: mutation.error?.message,
    success: mutation.isSuccess,
  };
};