import jwt from 'jsonwebtoken';
import { config } from '../../config/index.js';
// generate a signed JWT for a user object
export const generateToken = (user) => {
    if (!user || !user.id) {
        throw new Error('generateToken requires a user object with an id');
    }
    return jwt.sign(
        { sub: user.id },
        config().tokenSecret,
        { expiresIn: config().expirationTime }
    );
};

 
export const generateRefreshToken = (user, tokenId) => {
    jwt.sign(
        {
            id: user.id,
            jwtId: tokenId,
            type: 'refresh'
        },
        config().refreshTokenSecret,
        { expiresIn: config().refreshTokenExpirationTime }
    );
};
