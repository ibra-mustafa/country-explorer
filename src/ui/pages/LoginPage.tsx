import React, { useState } from 'react'
import { authService } from '../../infrastructure/auth/AuthService'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const res = await authService.login(email, password)
    setLoading(false)
    if (!res.ok) setError(res.message ?? 'Login failed')
    else window.location.hash = '#/'
  }

  return (
    <main style={{maxWidth: 420, margin: '2rem auto', padding: '0 1rem'}}>
      <h2>Login</h2>
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
        <div style={{marginTop: 12}}>
          <button type="submit" disabled={loading}>{loading ? 'Logging in…' : 'Login'}</button>
        </div>
      </form>
    </main>
  )
}

export default LoginPage
