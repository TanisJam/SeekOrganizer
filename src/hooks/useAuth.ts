import { useState, useCallback } from 'react';
import { AuthService } from '@/core/services/auth.service';
import { redirect } from 'next/navigation';
export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await AuthService.login({ email, password });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.status === 401) {
        console.log('Invalid credentials');
        setError('Invalid credentials');
      } else {
        setError('Authentication error');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    AuthService.removeToken();
    redirect('/login');
  }, []);

  return {
    isAuthenticated: AuthService.isAuthenticated(),
    isLoading,
    error,
    login,
    logout,
  };
};
