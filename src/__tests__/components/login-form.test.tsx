import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginForm } from '@/components/login-form';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

// Mock dependencies
jest.mock('@/hooks/use-auth');
jest.mock('sonner');

describe('LoginForm', () => {
  const mockLogin = jest.fn();
  const mockUseAuth = useAuth as jest.Mock;

  beforeEach(() => {
    // Reset mocks
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: null,
    });
    jest.clearAllMocks();
  });

  it('renders login form correctly', () => {
    render(<LoginForm />);
    // Check if the text Elements are present at least once
    expect(screen.getAllByText('Login').length).toBeGreaterThan(0);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    const mockEmail = 'test@example.com';
    const mockPassword = 'password123';
    mockLogin.mockResolvedValueOnce(undefined);

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: mockEmail },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: mockPassword },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(mockEmail, mockPassword);
      expect(toast.success).toHaveBeenCalledWith('Login successful');
    });
  });

  it('handles login failure', async () => {
    mockLogin.mockRejectedValueOnce(new Error('Login failed'));

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Login failed');
    });
  });

  it('validates form inputs', async () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
      expect(screen.getByText('String must contain at least 6 character(s)')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'invalid-email' },
    });

    await waitFor(() => {
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });
  });

  it('shows loading state', () => {
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      isLoading: true,
      error: null,
    });

    render(<LoginForm />);

    expect(screen.getByRole('button', { name: /login/i })).toBeDisabled();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('displays error message from useAuth', () => {
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: 'Authentication failed',
    });

    render(<LoginForm />);

    expect(screen.getByText('Authentication failed')).toBeInTheDocument();
  });
});
