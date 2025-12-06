import winston from 'winston';
import { config } from '../../config/index.js';

export const logger = winston.createLogger({
    level: config.logLevel,
    format: winston.format.json(),
    transports: [ new  winston.transports.Console() ]
});
