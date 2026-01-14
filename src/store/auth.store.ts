import { create } from "zustand"
import { storage, STORAGE_KEYS } from "@/lib/storage"
import { decodeToken } from "@/lib/jwt"
import type { AuthUser } from "@/types/auth.types"

interface AuthState {
  token: string | null
  user: AuthUser | null
  isAuthenticated: boolean
  setAuth: (token: string) => void
  logout: () => void
}

// Initialize auth state from storage
function getInitialState(): { token: string | null; user: AuthUser | null } {
  const token = storage.getString(STORAGE_KEYS.TOKEN)

  if (!token) {
    return { token: null, user: null }
  }

  const user = decodeToken(token)

  // If token is invalid or expired, clear it
  if (!user) {
    storage.remove(STORAGE_KEYS.TOKEN)
    return { token: null, user: null }
  }

  return { token, user }
}

const initialState = getInitialState()

export const useAuthStore = create<AuthState>((set) => ({
  token: initialState.token,
  user: initialState.user,
  isAuthenticated: !!initialState.user,

  setAuth: (token: string) => {
    const user = decodeToken(token)

    if (user) {
      storage.setString(STORAGE_KEYS.TOKEN, token)
      set({ token, user, isAuthenticated: true })
    }
  },

  logout: () => {
    storage.remove(STORAGE_KEYS.TOKEN)
    set({ token: null, user: null, isAuthenticated: false })
  },
}))

// Selector hooks for convenience
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated)
export const useUser = () => useAuthStore((state) => state.user)
export const useToken = () => useAuthStore((state) => state.token)
