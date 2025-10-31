import { useState } from 'react';
import { deleteUserUseCase } from '../../../domain/usecases/users/deleteUserUseCase';
import UserApi from '../../../data/datasources/UserApi';

export const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const userApi = new UserApi();

  const deleteUser = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      await deleteUserUseCase(id, userApi);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la suppression');
      console.error('Erreur lors de la suppression :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteUser,
    loading,
    error,
    success,
  };
};