
export class AuthService {
  private base = 'https://reqres.in/api';
  private apiKey = 'reqres-free-v1';

  async register(email: string, password: string): Promise<{ ok: boolean; message?: string }> {
    try {
      const res = await fetch(`${this.base}/register`, {
        method: 'POST',
        headers: {
          'x-api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        document.cookie = `jwt=${data.token}; path=/; secure; samesite=strict`;
        return { ok: true };
      }
      return { ok: false, message: data.error || 'Registration failed' };
    } catch (err) {
      return { ok: false, message: 'Network error' };
    }
  }

  async login(email: string, password: string): Promise<{ ok: boolean; message?: string }> {
    try {
      const res = await fetch(`${this.base}/login`, {
        method: 'POST',
        headers: {
          'x-api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        document.cookie = `jwt=${data.token}; path=/; secure; samesite=strict`;
        return { ok: true };
      }
      return { ok: false, message: data.error || 'Login failed' };
    } catch (err) {
      return { ok: false, message: 'Network error' };
    }
  }

  logout() {
    document.cookie = 'jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

export const authService = new AuthService()
