import { useState, useCallback } from 'react';
import { AuthService } from '@/core/services/auth.service';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await AuthService.login({ email, password });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de autenticación');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    AuthService.removeToken();
    window.location.href = '/login';
  }, []);

  return {
    isAuthenticated: AuthService.isAuthenticated(),
    isLoading,
    error,
    login,
    logout
  };
};