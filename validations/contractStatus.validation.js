const Joi = require("joi");

exports.contractStatusValidation = (data) => {
  const contractStatusSchema = Joi.object({
    name: Joi.string().required().min(3).max(255).messages({
      "string.base": "Name matn bo'lishi kerak",
      "string.empty": "Name bo'sh bo'lishi mumkin emas",
      "string.min": "Name kamida 3 ta belgidan iborat bo'lishi kerak",
      "string.max": "Name 255 ta belgidan oshmasligi kerak",
      "any.required": "Name kiritilishi majburiy",
    }),

    description: Joi.string().max(255).allow(null, "").messages({
      "string.base": "Description matn bo'lishi kerak",
      "string.max": "Description 255 ta belgidan oshmasligi kerak",
    }),
  });

  return contractStatusSchema.validate(data, { abortEarly: false });
};
