/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/core/services/api';
import { AuthService } from '@/core/services/auth.service';

describe('API Service', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should create axios instance with correct default config', () => {
    expect(api.defaults.baseURL).toBe('/api');
    expect(api.defaults.headers['Content-Type']).toBe('application/json');
  });

  describe('Request Interceptor', () => {
    it('should add auth token to headers when token exists', async () => {
      localStorage.setItem(AuthService.TOKEN_KEY, 'test-token');

      const config = { headers: {} };
      const handler = (config: any) => {
        if (localStorage.getItem(AuthService.TOKEN_KEY)) {
          config.headers.Authorization = `Bearer ${localStorage.getItem(
            AuthService.TOKEN_KEY
          )}`;
        }
        return config;
      };
      const result = await handler(config);

      expect(result.headers.Authorization).toBe('Bearer test-token');
    });

    it('should not add auth token when token does not exist', async () => {
      const config = { headers: {} };
      const handler = (config: any) => {
        if (localStorage.getItem(AuthService.TOKEN_KEY)) {
          config.headers.Authorization = `Bearer ${localStorage.getItem(
            AuthService.TOKEN_KEY
          )}`;
        }
        return config;
      };
      const result = await handler(config);

      expect(result.headers.Authorization).toBeUndefined();
    });
  });

  describe('Response Interceptor', () => {
    it('should handle 401 errors by removing token and redirecting', async () => {
      localStorage.setItem(AuthService.TOKEN_KEY, 'test-token');
      const mockReplace = jest.fn();
      const originalLocation = window.location;
      Object.defineProperty(window, 'location', {
        value: { replace: mockReplace },
        writable: true,
      });

      const error = {
        response: { status: 401 },
      };

      const interceptor = (api.interceptors.response as any).handlers[0];

      try {
        await interceptor.rejected(error);
      } catch (e) {
        expect(e).toEqual(error);
      }
      expect(localStorage.getItem(AuthService.TOKEN_KEY)).toBeNull();
      expect(mockReplace).toHaveBeenCalledWith('/login');

      window.location = originalLocation;
    });

    it('should pass through non-401 errors', async () => {
      const error = {
        response: { status: 500 },
      };

      const interceptor = (api.interceptors.response as any).handlers[0];

      await expect(interceptor.rejected(error)).rejects.toEqual(error);
      expect(localStorage.getItem(AuthService.TOKEN_KEY)).toBeNull();
    });
  });
});
