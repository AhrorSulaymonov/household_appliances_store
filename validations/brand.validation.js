const Joi = require("joi");

exports.brandValidation = (data) => {
  const brandSchema = Joi.object({
    name: Joi.string().min(1).max(50).required().messages({
      "string.base": "Brand name matn bo'lishi kerak",
      "string.empty": "Brand name bo'sh bo'lishi mumkin emas",
      "string.min": "Brand name kamida 1 ta belgidan iborat bo'lishi kerak",
      "string.max": "Brand name 50 ta belgidan oshmasligi kerak",
      "any.required": "Brand name kiritilishi shart",
    }),
  });

  return brandSchema.validate(data, { abortEarly: false });
};
