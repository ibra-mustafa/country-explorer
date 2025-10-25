import { create } from 'zustand';

interface AuthState {
  token: string;
  setToken: (token: string) => void;
  clearToken: () => void;
}

function getTokenFromCookie() {
  return document.cookie.split('; ').find(row => row.startsWith('jwt='))?.split('=')[1] || '';
}

export const useAuthStore = create<AuthState>((set) => ({
  token: getTokenFromCookie(),
  setToken: (token) => {
    set({ token });
    document.cookie = `jwt=${token}; path=/; secure; samesite=strict`;
  },
  clearToken: () => {
    set({ token: '' });
    document.cookie = 'jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  },
}));
