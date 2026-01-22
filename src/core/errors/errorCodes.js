export const ERROR_CODES = {
    USER_NOT_FOUND: { 
        code: 'USER_NOT_FOUND',
        message: 'User does not exist!',
        statusCode: 404,
        type: 'NOT_FOUND'
    },
    INVALID_CREDENTIALS: {
        code: 'INVALID_CREDENTIALS',
        message: 'Inavalid credentails provided',
        statusCode: 401,
        type: 'AUTH'
    },
    USER_ALREADY_EXIST: {
        code: 'USER_ALREADY_EXIST',
        message: 'User already registered',
        statusCode: 400,
        type: 'CONFLICT'
    },
    UNVERIFIED_USER: {
        code: 'UNVERIFIED_USER',
        message: 'User is not verified',
        statusCode: 401,
        type: 'AUTH'
    },
    WRONG_PASSWORD: {
        code: 'WRONG_PASSWORD',
        message: 'Wrong password',
        statusCode: 401,
        type: 'AUTH'
    },
    INVALID_VERIFICATION_CODE: {
        code: 'INVALID_VERIFICATION_CODE',
        message: 'Invalid verification code',
        statusCode: 400, 
        type: 'VALIDATION'
    },
    VERIFICATION_CODE_EXPIRED: {
        code: 'VERIFICATION_CODE_EXPIRED',
        message: 'verification code has expired, please request a new one',
        statusCode: 400,
        type: 'VALIDATION'
    },
    DATABASE_ERROR: {
        code: 'DATABASE_ERROR',
        message: 'Database operation failed',
        statusCode: 500,
        type: 'INFRA'
    },
    FORGOT_PASSWORD_CODE_EXPIRED: {
        code: 'FORGOT_PASSWORD_CODE_EXPIRED',
        message: 'Forgot password code has expired, please request a new one',
        statusCode: 400,
        type: 'VALIDATION'
    },
    POST_UNAVAILABLE: {
        code: 'POST_UNAVAILABLE',
        message: 'Post unavailable',
        statusCode: 404,
        type: 'NOT_FOUND'
    },
    UNAUTHORIZED_TO_UPDATE_POST: {
        code: 'UNAUTHORIZED_TO_UPDATE_POST',
        message: 'You are not authorized to update this post',
        statusCode: 403,
        type: 'AUTH'
    },
     UNAUTHORIZED_TO_DELETE_POST: {
        code: 'UNAUTHORIZED_TO_DELETE_POST',
        message: 'You are not authorized to delete this post',
        statusCode: 403, 
        type: 'AUTH'
     },
     INTERNAL_SERVER_ERROR: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Internal server error',
        statusCode: 500,
        type: 'BUG'
     },
     NO_VERIFICATION_CODE_FOUND: {
        code: 'NO_VERIFICATION_CODE_FOUND',
        message: 'No verification code found. Please request a new one.',
        statusCode: 404, 
        type: 'NOT_FOUND'
     },
     USER_ALREADY_VERIFIED: {
        code: 'USER_ALREADY_VERIFIED',
        message: 'User is already verified',
        statusCode: 400,
        Type: 'VALIDATION'
     },
     RATE_LIMIT_EXCEEDED: {
        code: 'RATE_LIMIT_XCEEDED',
        message: 'Too many requests, please try agin later',
        statusCode: 429,
        type: 'INFRA'
     },
     RATE_LIMIT_UNAVAILABLE: {
        code: 'RATE_LIMIT_UNAVAILABLE',
        message: 'Rate limiter service is unavailable',
        statusCode: 503,
        type: 'INFRA'
     },
     POST_NOT_FOUND: {
        code: 'POST_NOT_FOUND',
        message: 'post not found',
        statusCode: 404,
        type: 'NOT_FOUND' 
     },
     UNAUTHORIZED_ACTION: {
        code: 'UNAUTHORIZED_ACTION',
        message: 'You are not authorized to perform this action',
        statusCode: 403,
        type: 'AUTH'
     },
     COMMENT_NOT_FOUND: {
        code: 'COMMENT_NOT_FOUND',
        message: 'Comment not found',
        statusCode: 404,
        type: 'NOT_FOUND'
     },
     UNAUTHORIZED_TO_EDIT_COMMENT: {
        code: 'UNAUTHORIZED_TO_EDIT_COMMENT',
        message: 'You are not authorized to edit this comment',
        statusCode: 403, 
        type: 'AUTH'
     },
     UNAUTHORIZED_TO_DELETE_COMMENT: {
        code: 'UNAUTHORIZED_TO_DELETE_COMMENT',
        message: 'You are not authorized to delete this comment',
        statusCode: 403,
        type: 'AUTH'
     },
     INVALID_TOKEN: {
        code: 'INVALID_TOKEN',
        message: 'Invalid token',
        statusCode: 401,
        type: 'AUTH'
     },
     NO_COMMENTS_YET: {
        code: 'NO_COMMENTS_YET',
        message: 'No comments yet',
        statusCode: 404,
        type: 'NOT_FOUND'
     },
     MISSING_ROLE: {
      code: 'MISSING_ROLE', 
      message: 'User role is missing',
      statusCode: 400,
      type: 'VALIDATION'
     },
     INVALID_ROLE: {
      code: 'INVALID_ROLE',
      message: 'Invalid user role', 
      statusCode: 400,
      type: 'VALIDATION'
     },
     INVALID_REQUEST: {
      code: 'INVALID_REQUEST',
      message: 'Invalid request',
      statusCode: 400,
      type: 'VALIDATION'
},MISSING_REFRESH_TOKEN: {
   code: 'MISSING_REFRESH_TOKEN',
   message: 'Missing refresh token',
   statusCode: 401,
   type: 'AUTH'
},
    INVALID_REFRESH_TOKEN: {
      code: 'INVALID_REFRESH_TOKEN',
      message: 'Invalid refresh token',
      statusCode: 401,
      type: 'AUTH'
    },
    INVALID_TOKEN_TYPE: {
      code: 'INVALID_TOKEN_TYPE',
      message: 'Invalid token type',
      statusCode: 401,
      type: 'AUTH'
    },
    CAN_NOT_CHANGE_OWN_ROLE: {
      code: 'CAN_NOT_CHANGE_OWN_ROLE',
      message: 'You can not change your own role',
      statusCode: 400,
      type: 'VALIDATION'
    },
    };

