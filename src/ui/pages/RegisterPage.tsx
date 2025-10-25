import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { authService } from '../../infrastructure/auth/AuthService';
import { useAuthStore } from '../../core/store/authStore';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const navigate = useNavigate();
  const setToken = useAuthStore(state => state.setToken);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const res = await authService.register(email, password);
    setLoading(false);
    if (!res.ok) setError(res.message ?? 'Register failed');
    else {
      setSuccess('Registered you are now logged in');
      // Token is set in cookie by AuthService
      setToken(document.cookie.split('; ').find(row => row.startsWith('jwt='))?.split('=')[1] || '');
      setTimeout(() => navigate('/'), 800);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Create Account</h2>
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
              placeholder="Choose a password"
              autoComplete="new-password"
              minLength={6}
            />
          </div>
          {error && <div className="auth-message auth-error">{error}</div>}
          {success && <div className="auth-message auth-success">{success}</div>}
          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Creating Account...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
          <div className="auth-form-footer">
            Already have an account?
            <Link to="/login">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage
