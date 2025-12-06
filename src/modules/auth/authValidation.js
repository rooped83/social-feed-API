import joi from 'joi';

// sign in input
export const signInSchema = joi.object({
    email: joi.string()
    .min(6)
    .max(55)
    .required()
    .email({
        tlds: { allow: ["com", "net"] }
    }),
    password: joi.string()
    .required()
})

// validate sign up input
export const signUpSchema = joi.object({
    email: joi.string()
    .min(6)
    .max(55)
    .required()
    .email({
        tlds: { allow: ["com", "net"] }
    }),
     name: joi.string()
    .required()
    .min(3)
    .max(40)
    .trim()
    .pattern(new RegExp("^[a-zA-Z ]+$"))
    .message({"string.empty": "Please provide a name for your account",
        "string.pattern.base": "Wrong name format"
    }),
    password: joi.string()
    .required()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})(?=.*[!@#/$%^&*])"))
    .message("Password must be at least 8 characters and contains an uppercase, lowercase letter, number and a special character")
    });
   
    // validate change password
export const changePasswordSchema = joi.object({
    email:joi.string()
    .required()
    .email(),
    oldPassword: joi.string()
    .required(),
    newPassword: joi.string()
    .required()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})(?=.*[!@#$%^&*])"))
    .message("Wrong password format")
});

// forgot password code validation
 export const forgotPassCodeSchema = joi.object({
    code: joi.string()
    .required()
.pattern(new RegExp("^\d{6}$"))
.trim()
.message({ 
    "string.empty": "code is required",
    "string.pattern.base": "Verification code must be a 6 digit number" ,
}),
    email: joi.string()
    .required()
    .messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email format",
    }),
    newPassword: joi.string()
    .required()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})(?=.*[!@#$%^&*])"))
    .message({"string.empty": "Password is required",
        "string.pattern.base": "Password must be at least 8 characters and contains an uppercase, lowercase letter, number and a special character"
    })
})

// verification code validation\
 export const verificationCodeSchema = joi.object({
    code: joi.string()
    .required()
.pattern(new RegExp("^\\d{6}$"))
.trim()
.message({ 
    "string.empty": "Verification code is required",
    "string.pattern.base": "Verification code must be a 6 digit number" ,
}),
})
