import joi from 'joi';

export const commentSchema = joi.object({
    text: joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9 .,!?\'"-]{1,500}$'))
    .messages({
        'string.empty': 'The text is required',
        'string.pattern.base': 'Comment text contains invalid characters or exceeds length limit of 500 characters'
    }),
})