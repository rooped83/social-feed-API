import jwt from 'jsonwebtoken';
import { tokenConfig } from '../../config/tokenConfig.js';


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
        tokenConfig().accessTokenSecret,
        { expiresIn: tokenConfig().accessTokenExpirationTime }
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
        tokenConfig().refreshTokenSecret,
        { expiresIn: tokenConfig().refreshTokenExpirationTime }
    );
};
