import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { authService } from '../../infrastructure/auth/AuthService'

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const navigate = useNavigate();
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const res = await authService.register(email, password);
    setLoading(false);
    if (!res.ok) setError(res.message ?? 'Register failed');
    else {
      setSuccess('Registered — you are now logged in');
      // Token is set in cookie by AuthService
      setTimeout(() => navigate('/'), 800);
    }
  }

  return (
    <main style={{maxWidth: 420, margin: '2rem auto', padding: '0 1rem'}}>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <div style={{marginBottom: 8}}>
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" style={{width: '100%'}} />
        </div>
        <div style={{marginBottom: 8}}>
          <label>Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" style={{width: '100%'}} />
        </div>
        {error && <div style={{color: 'red'}}>{error}</div>}
        {success && <div style={{color: 'green'}}>{success}</div>}
        <div style={{marginTop: 12}}>
          <button type="submit" disabled={loading}>{loading ? 'Registering…' : 'Register'}</button>
        </div>
      </form>
    </main>
  )
}

export default RegisterPage
