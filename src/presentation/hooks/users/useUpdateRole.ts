import { useState } from 'react';
import { Role, UpdateRoleRequest } from '../../../data/models/roles';
import UserApi from '../../../data/datasources/UserApi';
import { useQueryClient } from '@tanstack/react-query';
import { updateRoleUseCase } from '../../../domain/usecases/users/updateRoleUseCase';

export const useUpdateRole = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const userApi = new UserApi();
  const queryClient = useQueryClient();

  const updateRole = async (id: number, payload: UpdateRoleRequest): Promise<Role | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await updateRoleUseCase(userApi, id, payload);
      setSuccess(true);
      
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      queryClient.invalidateQueries({ queryKey: ['role', id] });
      queryClient.invalidateQueries({ queryKey: ['role-statistics'] });
      
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la modification du rôle');
      console.error('Erreur lors de la modification :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    updateRole,
    loading,
    error,
    success,
  };
};