import { useState } from 'react';
import { LoginRequest, LoginResponse } from '../../../data/models/users';
import { loginUseCase } from '../../../domain/usecases/users/loginUseCase';
import UserApi from '../../../data/datasources/UserApi';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const userApi = new UserApi();

  const login = async (credentials: LoginRequest): Promise<LoginResponse | undefined> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await loginUseCase(credentials, userApi);
      setSuccess(true);
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la connexion');
      console.error('Erreur lors de la connexion :', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
    success,
  };
};