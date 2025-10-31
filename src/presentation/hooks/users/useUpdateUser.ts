import { useState } from 'react';
import { User, UpdateUserRequest } from '../../../data/models/users';
import { updateUserUseCase } from '../../../domain/usecases/users/updateUserUseCase';
import UserApi from '../../../data/datasources/UserApi';

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const userApi = new UserApi();

  const updateUser = async (id: number, userData: UpdateUserRequest): Promise<User | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await updateUserUseCase(id, userData, userApi);
      setSuccess(true);
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la modification');
      console.error('Erreur lors de la modification :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    updateUser,
    loading,
    error,
    success,
  };
};