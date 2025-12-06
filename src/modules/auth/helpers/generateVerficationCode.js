import crypto from 'crypto';
import { config } from '../../../config/index.js';
 
 // generate the verification code
 export function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); 
}


// hash the verification code
export function hashVerificationCode(code) {
    const pepper = config.PEPPER_SECRET;
    return crypto.createHash('sha256').update(code + pepper).digest('hex');
};