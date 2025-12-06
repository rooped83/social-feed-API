export const errorHandler = (err, req, res, next) => {
    if (req.headersSent) return next(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    // operatioonal errors
    if (process.env.NODE_ENV === 'development') {
        console.error('Error stack:', err.stack);
        return res.status(err.statusCode).json({
            status: err.status || 'error',
            message: err.message,
            code: err.code || 'INTERNAL_SERVER_ERROR',
            stack: err.stack
        });
    }
    // production error : 
    if (!err.isOperational) {
        console.error('Unexpected Error:', err);
        return res.status(500).json({
            status: 'error', 
            code: 'INTERNAL_SERVER_ERROR',
            message: 'An unexpected error occured.'
        })
    };
  // mongoose errors: 
    if (err.name === 'ValidationError') {
        err.statusCode = 400;
        err.message = err.message || 'Validation error';
    }
    if (err.name === 'CastError') { 
        err.statusCode = 400;
        err.message = `Invalid ${err.path}: ${err.value}`
    };
    if (err.code == 11000 && err.name === 'MongoServerError') {
        err.statusCode = 400;
        err.message = 'Duplicate field value entered';
    };
// other known operational errors: 
    return res.status(err.statusCode).json({
        status: 'error',
        message: err.message,
        code: err.code || 'Internal Server Error'
    });
};