import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
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
    <div className="auth-container">
      <div className="auth-form">
        <h2>Welcome Back</h2>
        <form onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              required
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              required
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>
          {error && <div className="auth-message auth-error">{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Logging in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
          <div className="auth-form-footer">
            Don't have an account?
            <Link to="/register">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage
