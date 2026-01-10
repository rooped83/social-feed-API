import jwt from 'jsonwebtoken';
import { config } from '../../config/index.js';

// generate a signed JWT for a user object
export const generateToken = (user) => {
    if (!user || !user.id) {
        throw new Error('generateToken requires a user object with an id');
    }
    return jwt.sign(
        { id: user.id,
            tokenId: user.tokenId,
            role: user.role,
            type: 'access'
         },
        config().tokenSecret,
        { expiresIn: config().expirationTime }
    );
};

 
export const generateRefreshToken = (user, tokenId) => {
    return jwt.sign(
        {
            id: user.id,
            tokenId,
            role: user.role,
            type: 'refresh'
        },
        config().refreshTokenSecret,
        { expiresIn: config().refreshTokenExpirationTime }
    );
};
