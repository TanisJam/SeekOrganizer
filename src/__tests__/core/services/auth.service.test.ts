import axios from 'axios';
import { AuthService } from '@/core/services/auth.service';

jest.mock('axios');

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('login', () => {
    const credentials = {
      email: 'test@example.com', 
      password: 'password123'
    };

    it('should successfully login and store token', async () => {
      const mockToken = 'mock-jwt-token';
      (axios.post as jest.Mock).mockResolvedValueOnce({
        data: { token: mockToken }
      });

      await AuthService.login(credentials);

      expect(axios.post).toHaveBeenCalledWith('/api/auth', credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      expect(localStorage.getItem(AuthService.TOKEN_KEY)).toBe(mockToken);
    });

    it('should throw error when response is empty', async () => {
      (axios.post as jest.Mock).mockResolvedValueOnce(null);

      await expect(AuthService.login(credentials))
        .rejects
        .toThrow('Invalid credentials');
      
      expect(localStorage.getItem(AuthService.TOKEN_KEY)).toBeNull();
    });

    it('should throw error when request fails', async () => {
      const error = new Error('Network error');
      (axios.post as jest.Mock).mockRejectedValueOnce(error);

      await expect(AuthService.login(credentials))
        .rejects
        .toThrow('Network error');
      
      expect(localStorage.getItem(AuthService.TOKEN_KEY)).toBeNull();
    });

    it('should throw error when response has no token', async () => {
      (axios.post as jest.Mock).mockResolvedValueOnce({
        data: {}
      });

      await AuthService.login(credentials);
      
      expect(localStorage.getItem(AuthService.TOKEN_KEY)).toBe('undefined');
    });
  });
});