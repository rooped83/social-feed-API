import joi from 'joi';

export const postSchema = joi.object({
    title: joi.string()
    .required()
    .min(3)
    .max(100)
    .trim()
    .pattern(new RegExp("^[a-zA-Z0-9 ]+$"))
    .message({"string.pattern.base": "Title must be at least 3 characters and contains only letters, numbers and spaces",
        "string.empty": "Title is required"
             }),
    category: joi.string()
    .required()
    .trim()
    .valid("tech", "sport", "science", "politics", "entertainment", "others")
    .pattern(new RegExp("^[a-zA-Z]+$"))
    .messages({
        "string.pattern.base": "Your category must be a valid category",
        "string.empty": "Category is required"
    }),
    content: joi.string()
.required()
.trim()
.min(6)
.max(1000)
.pattern(new RegExp("^[a-zA-Z0-9 ]+$"))
.message({"string.pattern.base": "Content must be at least 6 characters and contains only letters, numbers and spaces",
    "string.empty": "Content is required"
         })
    });