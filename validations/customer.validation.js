const Joi = require("joi");

exports.customerValidation = (data) => {
  const customerSchema = Joi.object({
    first_name: Joi.string().min(1).max(50).required().messages({
      "string.base": "First name matn bo'lishi kerak",
      "string.empty": "First name bo'sh bo'lishi mumkin emas",
      "string.min": "First name kamida 1 ta belgidan iborat bo'lishi kerak",
      "string.max": "First name 50 ta belgidan oshmasligi kerak",
      "any.required": "First name kiritilishi shart",
    }),
    last_name: Joi.string().max(50).allow(null, "").messages({
      "string.base": "Last name matn bo'lishi kerak",
      "string.max": "Last name 50 ta belgidan oshmasligi kerak",
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
    email: Joi.string().email().required().messages({
      "string.email": "Email to'g'ri email formatida bo'lishi kerak",
      "string.empty": "Email bo'sh bo'lishi mumkin emas",
      "any.required": "Email kiritilishi shart",
    }),
    password: Joi.string().min(6).max(255).required().messages({
      "string.base": "Password matn bo'lishi kerak",
      "string.empty": "Password bo'sh bo'lishi mumkin emas",
      "string.min": "Password kamida 6 ta belgidan iborat bo'lishi kerak",
      "string.max": "Password 255 ta belgidan oshmasligi kerak",
      "any.required": "Password kiritilishi shart",
    }),
    confirm_password: Joi.any().valid(Joi.ref("password")).messages({
      "any.only": "Confirm password parolga mos kelishi kerak",
    }),
    passport_number: Joi.string().min(5).max(255).required().messages({
      "string.base": "Passport number matn bo'lishi kerak",
      "string.empty": "Passport number bo'sh bo'lishi mumkin emas",
      "string.min":
        "Passport number kamida 5 ta belgidan iborat bo'lishi kerak",
      "string.max": "Passport number 255 ta belgidan oshmasligi kerak",
      "any.required": "Passport number kiritilishi shart",
    }),
    address: Joi.string().min(10).max(255).required().messages({
      "string.base": "Address matn bo'lishi kerak",
      "string.empty": "Address bo'sh bo'lishi mumkin emas",
      "string.min": "Address kamida 10 ta belgidan iborat bo'lishi kerak",
      "string.max": "Address 255 ta belgidan oshmasligi kerak",
      "any.required": "Address kiritilishi shart",
    }),
    refresh_token: Joi.string().max(255).allow(null, "").messages({
      "string.base": "Refresh token matn bo'lishi kerak",
      "string.max": "Refresh token 255 ta belgidan oshmasligi kerak",
    }),
    verification: Joi.string().max(255).allow(null, "").messages({
      "string.base": "Verification code matn bo'lishi kerak",
      "string.max": "Verification code 255 ta belgidan oshmasligi kerak",
    }),
    created_at: Joi.date().iso().messages({
      "date.base": "Created at to'g'ri sana bo'lishi kerak",
      "date.format": "Created at ISO formatda bo'lishi kerak",
    }),
    is_active: Joi.boolean().default(false).messages({
      "boolean.base": "Is active boolean qiymat bo'lishi kerak",
    }),
  });

  return customerSchema.validate(data, { abortEarly: false });
};
