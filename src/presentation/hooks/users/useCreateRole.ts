import { useState } from 'react';
import { Role, CreateRoleRequest } from '../../../data/models/users';
import UserApi from '../../../data/datasources/UserApi';
import { useQueryClient } from '@tanstack/react-query';
import { createRoleUseCase } from '../../../domain/usecases/users/createRoleUseCase';

export const useCreateRole = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const userApi = new UserApi();
  const queryClient = useQueryClient();

  const createRole = async (payload: CreateRoleRequest): Promise<Role | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await createRoleUseCase(userApi, payload);
      setSuccess(true);
      
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      queryClient.invalidateQueries({ queryKey: ['role-statistics'] });
      
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création du rôle');
      console.error('Erreur lors de la création :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    createRole,
    loading,
    error,
    success,
  };
};