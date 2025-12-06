import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
 
// loading env vars from .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envFile = 
process.env.NODE_ENV === 'production' ? '.env.production' :
process.env.NODE_ENV === 'test' ? '.env.test' :
'.env.development';
 
dotenv.config({
    path: path.resolve(__dirname, '../../', envFile)
});

