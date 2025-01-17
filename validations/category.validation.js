const Joi = require("joi");

exports.categoryValidation = (data) => {
  const categorySchema = Joi.object({
    name: Joi.string().required().min(1).max(255).messages({
      "string.base": "Name matn bo'lishi kerak",
      "string.empty": "Name bo'sh bo'lishi mumkin emas",
      "string.min": "Name kamida 1 ta belgidan iborat bo'lishi kerak",
      "string.max": "Name 255 ta belgidan oshmasligi kerak",
      "any.required": "Name kiritilishi majburiy",
    }),
    categoryId: Joi.number().integer().allow(null).messages({
      "number.base": "category ID butun son bo'lishi kerak",
      "number.integer": "category ID faqat butun son bo'lishi kerak",
    }),
    description: Joi.string().max(255).allow(null, "").messages({
      "string.base": "Description matn bo'lishi kerak",
      "string.max": "Description 255 ta belgidan oshmasligi kerak",
    }),
  });

  return categorySchema.validate(data, { abortEarly: false });
};
