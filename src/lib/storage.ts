const STORAGE_PREFIX = "coursivo_"

export const storage = {
  getString: (key: string): string | null => {
    return localStorage.getItem(`${STORAGE_PREFIX}${key}`)
  },

  setString: (key: string, value: string): void => {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, value)
  },

  remove: (key: string): void => {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`)
  },
}

// Typed storage keys
export const STORAGE_KEYS = {
  TOKEN: "token",
} as const
