import { useState } from 'react';
import { ChangePasswordRequest } from '../../../data/models/users';
import { changePasswordUseCase } from '../../../domain/usecases/users/changePasswordUseCase';
import UserApi from '../../../data/datasources/UserApi';

export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const userApi = new UserApi();

  const changePassword = async (passwordData: ChangePasswordRequest): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      await changePasswordUseCase(passwordData, userApi);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Erreur lors du changement de mot de passe');
      console.error('Erreur lors du changement :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    changePassword,
    loading,
    error,
    success,
  };
};