const Joi = require("joi");

exports.productValidation = (data) => {
  const productSchema = Joi.object({
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
    price: Joi.number().precision(2).min(0).required().messages({
      "number.base": "Price raqam bo'lishi kerak",
      "number.precision": "Price ikki kasrli raqam bo'lishi kerak",
      "number.min": "Price musbat yoki 0 dan katta bo'lishi kerak",
      "any.required": "Price kiritilishi shart",
    }),
    stock: Joi.number().integer().min(0).required().messages({
      "number.base": "Stock raqam bo'lishi kerak",
      "number.integer": "Stock butun son bo'lishi kerak",
      "number.min": "Stock musbat yoki 0 dan katta bo'lishi kerak",
      "any.required": "Stock kiritilishi shart",
    }),
    categoryId: Joi.number().integer().positive().required().messages({
      "number.base": "Category ID raqam bo'lishi kerak",
      "number.integer": "Category ID butun son bo'lishi kerak",
      "number.positive": "Category ID musbat son bo'lishi kerak",
      "any.required": "Category ID kiritilishi shart",
    }),
    brandId: Joi.number().integer().positive().required().messages({
      "number.base": "Brand ID raqam bo'lishi kerak",
      "number.integer": "Brand ID butun son bo'lishi kerak",
      "number.positive": "Brand ID musbat son bo'lishi kerak",
      "any.required": "Brand ID kiritilishi shart",
    }),
    colorId: Joi.number().integer().positive().required().messages({
      "number.base": "Color ID raqam bo'lishi kerak",
      "number.integer": "Color ID butun son bo'lishi kerak",
      "number.positive": "Color ID musbat son bo'lishi kerak",
      "any.required": "Color ID kiritilishi shart",
    }),
  });

  return productSchema.validate(data, { abortEarly: false });
};
