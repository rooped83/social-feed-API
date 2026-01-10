export const rateLimiterConfig = {
    read: { 
        ADMIN: { points: 1000, duration: 60, blockDuration: 30 },
        USER: { points: 300, duration: 60, blockDuration: 60 },
        ANONYMOUS: { points: 50, duration: 60, blockDuration: 120 },
        EDITOR: { points: 500, duration: 60, blockDuration: 45 }
    },
    write: {
        ADMIN: { points: 300, duration: 60, blockDuration: 30 },
        USER: { points: 40, duration: 60, blockDuration: 60 },
        EDITOR: { points: 80, duration: 60, blockDuration: 45 }
    },
    destructive: { 
        ADMIN: { points: 100, duration: 60, blockDuration: 30 },
        USER: { points: 10, duration: 60, blockDuration: 60 },
        EDITOR: { points: 20, duration: 60, blockDuration: 45 }
    },
    login: {
        points: 5,
        duration: 60,
        blockDuration: 300
    },
    signUp: {
        points: 3,
        duration: 60,
        blockDuration: 300
    },
    forgotPassword: {
        points: 3,
        duration: 60,
        blockDuration: 600
    },
    resetPassword: {
        points: 5,
        duration: 60,
        blockDuration: 120
    },
    refreshToken: {
        points: 10,
        duration: 60,
        blockDuration: 300
    }, 
    logout: {
        points: 12,
        duration: 60,
        blockDuration: 120
    },
    emailVerification: {
        points: 5,
        duration: 60,
        blockDuration: 300
    }
};
