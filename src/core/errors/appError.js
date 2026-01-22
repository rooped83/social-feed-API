export default class AppError extends Error {
  constructor(errorDef) {
    if (errorDef instanceof AppError) {
      return errorDef; 
    }

    if (typeof errorDef !== 'object') {
      throw new Error('AppError must be constructed with ERROR_CODES');
    }

    const { code, message, statusCode, type } = errorDef;
    super(message);

    this.code = code;
    this.statusCode = statusCode;
    this.type = type;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
