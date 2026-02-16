export const rateLimiterConfig = {
  read: { 
    ADMIN: { points: 1000, duration: 60, blockDuration: 30 },
    EDITOR: { points: 500, duration: 60, blockDuration: 45 },
    USER: { points: 300, duration: 60, blockDuration: 60 },
    ANONYMOUS: { points: 50, duration: 60, blockDuration: 120 }
  },

  write: {
    ADMIN: { points: 300, duration: 60, blockDuration: 30 },
    EDITOR: { points: 80, duration: 60, blockDuration: 45 },
    USER: { points: 40, duration: 60, blockDuration: 60 },
    ANONYMOUS: null // explicitly not allowed
  },

  destructive: { 
    ADMIN: { points: 100, duration: 60, blockDuration: 30 },
    EDITOR: { points: 20, duration: 60, blockDuration: 45 },
    USER: { points: 10, duration: 60, blockDuration: 60 },
    ANONYMOUS: null
  },

  login: {
    ANONYMOUS: { points: 5, duration: 60, blockDuration: 300 }
  },

  signUp: {
    ANONYMOUS: { points: 3, duration: 60, blockDuration: 300 }
  },

  forgotPassword: {
    ANONYMOUS: { points: 3, duration: 60, blockDuration: 600 }
  },

  resetPassword: {
    ANONYMOUS: { points: 5, duration: 60, blockDuration: 120 }
  },

  refreshToken: {
    USER: { points: 10, duration: 60, blockDuration: 300 },
    ADMIN: { points: 20, duration: 60, blockDuration: 120 }
  },

  logout: {
    USER: { points: 12, duration: 60, blockDuration: 120 },
    ADMIN: { points: 20, duration: 60, blockDuration: 60 }
  },

  emailVerification: {
    USER: { points: 5, duration: 60, blockDuration: 300 }
  }
};
