const Joi = require("joi");

exports.productDiscountValidation = (data) => {
  const productDiscountSchema = Joi.object({
    id: Joi.number().integer().positive().messages({
      "number.base": "ID raqam bo'lishi kerak",
      "number.integer": "ID butun son bo'lishi kerak",
      "number.positive": "ID musbat son bo'lishi kerak",
    }),
    productId: Joi.number().integer().positive().required().messages({
      "number.base": "Product ID raqam bo'lishi kerak",
      "number.integer": "Product ID butun son bo'lishi kerak",
      "number.positive": "Product ID musbat son bo'lishi kerak",
      "any.required": "Product ID kiritilishi shart",
    }),
    discountId: Joi.number().integer().positive().required().messages({
      "number.base": "Discount ID raqam bo'lishi kerak",
      "number.integer": "Discount ID butun son bo'lishi kerak",
      "number.positive": "Discount ID musbat son bo'lishi kerak",
      "any.required": "Discount ID kiritilishi shart",
    }),
  });

  return productDiscountSchema.validate(data, { abortEarly: false });
};
