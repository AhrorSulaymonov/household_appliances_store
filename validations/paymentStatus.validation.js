const Joi = require("joi");

exports.paymentStatusValidation = (data) => {
  const paymentStatusSchema = Joi.object({
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
    description: Joi.string().max(255).allow(null).messages({
      "string.base": "Description matn bo'lishi kerak",
      "string.max": "Description 255 ta belgidan oshmasligi kerak",
    }),
  });

  return paymentStatusSchema.validate(data, { abortEarly: false });
};
