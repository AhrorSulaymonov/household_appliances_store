const Joi = require("joi");

exports.adminValidation = (data) => {
  const adminSchema = Joi.object({
    first_name: Joi.string().min(2).max(50).required().messages({
      "string.base": "first_name matn bo'lishi kerak",
      "string.empty": "first_name bo'sh bo'lishi mumkin emas",
      "string.min": "first_name kamida 2 ta belgidan iborat bo'lishi kerak",
      "string.max": "first_name 50 ta belgidan oshmasligi kerak",
      "any.required": "first_name kiritilishi shart",
    }),
    last_name: Joi.string().min(2).max(50).allow(null, "").messages({
      "string.base": "last_name matn bo'lishi kerak",
      "string.min": "last_name kamida 2 ta belgidan iborat bo'lishi kerak",
      "string.max": "last_name 50 ta belgidan oshmasligi kerak",
    }),
    phone: Joi.string()
      .pattern(/^\d{2}-\d{3}-\d{2}-\d{2}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Telefon raqami XX-XXX-XX-XX formatida bo'lishi kerak (masalan: 99-123-45-67)",
        "string.empty": "Telefon raqami bo'sh bo'lishi mumkin emas",
        "any.required": "Telefon raqami kiritilishi shart",
      }),
    username: Joi.string().min(4).max(50).required().messages({
      "string.base": "username matn bo'lishi kerak",
      "string.empty": "username bo'sh bo'lishi mumkin emas",
      "string.min": "username kamida 4 ta belgidan iborat bo'lishi kerak",
      "string.max": "username 50 ta belgidan oshmasligi kerak",
      "any.required": "username kiritilishi shart",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "email to'g'ri email formatida bo'lishi kerak",
      "string.empty": "email bo'sh bo'lishi mumkin emas",
      "any.required": "email kiritilishi shart",
    }),
    password: Joi.string()
      .min(6)
      .max(255)
      .pattern(new RegExp("^[a-zA-Z0-9!@# ]+$"))
      .required()
      .messages({
        "string.pattern.base":
          "Parol faqat harf, raqam va maxsus belgilar (!, @, #) dan iborat bo'lishi mumkin",
        "string.empty": "password bo'sh bo'lishi mumkin emas",
        "string.min": "password kamida 6 ta belgidan iborat bo'lishi kerak",
        "string.max": "password 255 ta belgidan oshmasligi kerak",
        "any.required": "password kiritilishi shart",
      }),
    confirm_password: Joi.any().valid(Joi.ref("password")).messages({
      "any.only": "confirm_password parolga mos kelishi kerak",
    }),
    is_creator: Joi.boolean().default(false).messages({
      "boolean.base": "is_creator boolean qiymat bo'lishi kerak",
    }),
    refresh_token: Joi.string().max(255).allow(null, "").messages({
      "string.max": "Refresh token 255 ta belgidan oshmasligi kerak",
    }),
    verification: Joi.string().max(255).allow(null, "").messages({
      "string.max": "Verification 255 ta belgidan oshmasligi kerak",
    }),
  });

  return adminSchema.validate(data, { abortEarly: false });
};
