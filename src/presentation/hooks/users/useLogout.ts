import { useState } from 'react';
import { logoutUseCase } from '../../../domain/usecases/users/logoutUseCase';
import UserApi from '../../../data/datasources/UserApi';

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const userApi = new UserApi();

  const logout = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      await logoutUseCase(userApi);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la déconnexion');
      console.error('Erreur lors de la déconnexion :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    logout,
    loading,
    error,
    success,
  };
};