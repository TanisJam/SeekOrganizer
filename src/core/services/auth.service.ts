import axios from 'axios';

interface AuthResponse {
  token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export class AuthService {
  static readonly TOKEN_KEY = 'auth_token';

  static async login(credentials: LoginCredentials): Promise<void> {
    const response = await axios.post<AuthResponse>('/api/auth', credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response) {
      throw new Error('Invalid credentials');
    }

    const data: AuthResponse = response.data;
    this.setToken(data.token);
  }

  static getToken(): string | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    return localStorage.getItem(this.TOKEN_KEY);
  }

  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
