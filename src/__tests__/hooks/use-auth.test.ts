import { renderHook, act } from '@testing-library/react';
import { useAuth } from '@/hooks/use-auth';
import { AuthService } from '@/core/services/auth.service';

jest.mock('@/core/services/auth.service');
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should login successfully', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    (AuthService.login as jest.Mock).mockResolvedValueOnce({});

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login(email, password);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(AuthService.login).toHaveBeenCalledWith({ email, password });
  });

  it('should handle invalid credentials error', async () => {
    const email = 'test@example.com';
    const password = 'wrongpassword';
    const error = { response: { status: 401 } };
    (AuthService.login as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      try {
        await result.current.login(email, password);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // Expected error
      }
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Invalid credentials');
    expect(AuthService.login).toHaveBeenCalledWith({ email, password });
  });

  it('should handle general authentication error', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const error = new Error('Network error');
    (AuthService.login as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      try {
        await result.current.login(email, password);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // Expected error
      }
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Authentication error');
    expect(AuthService.login).toHaveBeenCalledWith({ email, password });
  });
});