const Joi = require("joi");

exports.paymentMethodValidation = (data) => {
  const paymentMethodSchema = Joi.object({
    id: Joi.number().integer().positive().messages({
      "number.base": "ID raqam bo'lishi kerak",
      "number.integer": "ID butun son bo'lishi kerak",
      "number.positive": "ID musbat son bo'lishi kerak",
    }),
    name: Joi.string().min(3).max(255).required().messages({
      "string.base": "Name matn bo'lishi kerak",
      "string.empty": "Name bo'sh bo'lishi mumkin emas",
      "string.min": "Name kamida 3 ta belgidan iborat bo'lishi kerak",
      "string.max": "Name 255 ta belgidan oshmasligi kerak",
      "any.required": "Name kiritilishi shart",
    }),
    method_logo: Joi.string().min(3).max(255).required().messages({
      "string.base": "Method logo matn bo'lishi kerak",
      "string.empty": "Method logo bo'sh bo'lishi mumkin emas",
      "string.min": "Method logo kamida 3 ta belgidan iborat bo'lishi kerak",
      "string.max": "Method logo 255 ta belgidan oshmasligi kerak",
      "any.required": "Method logo kiritilishi shart",
    }),
    is_active: Joi.boolean().default(true).messages({
      "boolean.base": "Is active qiymati true yoki false bo'lishi kerak",
    }),
  });

  return paymentMethodSchema.validate(data, { abortEarly: false });
};
