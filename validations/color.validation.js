const Joi = require("joi");

exports.colorValidation = (data) => {
  const colorSchema = Joi.object({
    name: Joi.string().required().min(1).max(255).messages({
      "string.base": "Name matn bo'lishi kerak",
      "string.empty": "Name bo'sh bo'lishi mumkin emas",
      "string.min": "Name kamida 1 ta belgidan iborat bo'lishi kerak",
      "string.max": "Name 255 ta belgidan oshmasligi kerak",
      "any.required": "Name kiritilishi majburiy",
    }),
    
  });

  return colorSchema.validate(data, { abortEarly: false });
};
