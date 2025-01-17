const Joi = require("joi");

exports.imageValidation = (data) => {
  const imageSchema = Joi.object({
    id: Joi.number().integer().positive().messages({
      "number.base": "ID raqam bo'lishi kerak",
      "number.integer": "ID butun son bo'lishi kerak",
      "number.positive": "ID musbat son bo'lishi kerak",
    }),
    image_url: Joi.string().uri().required().messages({
      "string.base": "Image URL matn bo'lishi kerak",
      "string.uri": "Image URL to'g'ri URL formatida bo'lishi kerak",
      "string.empty": "Image URL bo'sh bo'lishi mumkin emas",
      "any.required": "Image URL kiritilishi shart",
    }),
    is_main: Joi.boolean().default(false).messages({
      "boolean.base": "Is main qiymati true yoki false bo'lishi kerak",
    }),
    productId: Joi.number().integer().positive().required().messages({
      "number.base": "Product ID raqam bo'lishi kerak",
      "number.integer": "Product ID butun son bo'lishi kerak",
      "number.positive": "Product ID musbat son bo'lishi kerak",
      "any.required": "Product ID kiritilishi shart",
    }),
  });

  return imageSchema.validate(data, { abortEarly: false });
};
