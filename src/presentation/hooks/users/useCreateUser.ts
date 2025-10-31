import { useState } from 'react';
import { User, CreateUserRequest } from '../../../data/models/users';
import { createUserUseCase } from '../../../domain/usecases/users/createUserUseCase';
import UserApi from '../../../data/datasources/UserApi';

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const userApi = new UserApi();

  const createUser = async (userData: CreateUserRequest): Promise<User | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await createUserUseCase(userData, userApi);
      setSuccess(true);
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création');
      console.error('Erreur lors de la création :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    createUser,
    loading,
    error,
    success,
  };
};