export const rateLimiterConfig = {
    anonymous: {
        points: 50,
        duration: 60,
        blockDuration: 120,
        keyPrefix: 'rl_annyms'
    },
    user: {
        points: 150,
        duration: 60,
        blockDuration: 60,
        keyPrefix: 'rl_user'
    },
    admin: {
        points: 1000,
        duration: 60,
        blockDuration: 30,
        keyPrefix: 'rl_admin'
    },
    login: {
        points: 5,
        duration: 60,
        blockDuration: 300,
        keyPrefix: 'rl_login'
    }, 
    signUp: {
        points: 3, 
        duration: 60,
        blockDuration: 300,
        keyPrefix: 'rl_signup'
    },
    forgotPassword: {
        points: 5,
        duration: 60,
        blockDuration: 300,
        keyPrefix: 'rl_forgot_pass'
    },
    resetPassword: {
        points: 5,
        duration: 60,
        blockDuration: 300,
        keyPrefix: 'rl_pass_reset'
    }
};