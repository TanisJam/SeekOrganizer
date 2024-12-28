import { useState, useCallback } from 'react';
import { AuthService } from '@/core/services/auth.service';
import { redirect } from 'next/navigation';
/**
 * Custom hook for authentication.
 *
 * @returns {Object} An object containing authentication state and methods.
 * @returns {boolean} isAuthenticated - Indicates if the user is authenticated.
 * @returns {boolean} isLoading - Indicates if an authentication request is in progress.
 * @returns {string | null} error - Error message if an authentication error occurs.
 * @returns {Function} login - Function to log in a user with email and password.
 * @returns {Function} logout - Function to log out the current user.
 */
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
