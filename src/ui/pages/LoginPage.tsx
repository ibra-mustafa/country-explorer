import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { authService } from '../../infrastructure/auth/AuthService';
import { useAuthStore } from '../../core/store/authStore';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate();
  const setToken = useAuthStore(state => state.setToken);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await authService.login(email, password);
    setLoading(false);
    if (!res.ok) setError(res.message ?? 'Login failed');
    else {
      // Token is set in cookie by AuthService
      setToken(document.cookie.split('; ').find(row => row.startsWith('jwt='))?.split('=')[1] || '');
      navigate('/');
    }
  }

  return (
    <main>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" />
        </div>
        <div>
          <label>Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
        </div>
        {error && <div>{error}</div>}
        <div>
          <button type="submit" disabled={loading}>{loading ? 'Logging in…' : 'Login'}</button>
        </div>
      </form>
    </main>
  );
}

export default LoginPage
