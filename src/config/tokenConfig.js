import dotenv from 'dotenv';
dotenv.config();
import { requiredEnv } from './requiredEnv.js';

export const tokenConfig = () => ({
    accessTokenSecret: process.env.TOKEN_SECRET || requiredEnv('TOKEN_SECRET'),
    accessTokenExpirationTime: process.env.EXPIRATION_TIME || '1d',
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || requiredEnv('REFRESH_TOKEN_SECRET'),
    refreshTokenExpirationTime: process.env.REFRESH_TOKEN_EXPIRATION_TIME || '3d'
});