import { useState } from 'react';
import UserApi from '../../../data/datasources/UserApi';
import { useQueryClient } from '@tanstack/react-query';
import { deleteRoleUseCase } from '../../../domain/usecases/users/deleteRoleUseCase';

export const useDeleteRole = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const userApi = new UserApi();
  const queryClient = useQueryClient();

  const deleteRole = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      await deleteRoleUseCase(userApi, id);
      setSuccess(true);
      
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      queryClient.invalidateQueries({ queryKey: ['role-statistics'] });
      
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la suppression du rôle');
      console.error('Erreur lors de la suppression :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteRole,
    loading,
    error,
    success,
  };
};