type UserRecord = { email: string; password: string }

const USERS_KEY = 'ce_users'

export class AuthService {
  // Very small in-memory/localStorage-backed fake auth for demo/testing.
  private loadUsers(): UserRecord[] {
    try {
      const raw = localStorage.getItem(USERS_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }

  private saveUsers(users: UserRecord[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  }

  async register(email: string, password: string): Promise<{ ok: boolean; message?: string }>{
    const users = this.loadUsers()
    if (users.find(u => u.email === email)) {
      return { ok: false, message: 'Email already registered' }
    }
    users.push({ email, password })
    this.saveUsers(users)
    // Fake token
    localStorage.setItem('ce_token', btoa(email))
    return { ok: true }
  }

  async login(email: string, password: string): Promise<{ ok: boolean; message?: string }>{
    const users = this.loadUsers()
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) return { ok: false, message: 'Invalid credentials' }
    localStorage.setItem('ce_token', btoa(email))
    return { ok: true }
  }

  logout() {
    localStorage.removeItem('ce_token')
  }
}

export const authService = new AuthService()
