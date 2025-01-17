const Joi = require("joi");

exports.cartItemValidation = (data) => {
  const cartItemSchema = Joi.object({
    productId: Joi.number().integer().required().messages({
      "number.base": "Product ID butun son bo'lishi kerak",
      "number.integer": "Product ID faqat butun son bo'lishi kerak",
      "any.required": "Product ID kiritilishi majburiy",
    }),
    cartId: Joi.number().integer().required().messages({
      "number.base": "Cart ID butun son bo'lishi kerak",
      "number.integer": "Cart ID faqat butun son bo'lishi kerak",
      "any.required": "Cart ID kiritilishi majburiy",
    }),
    quantity: Joi.number().integer().min(1).required().messages({
      "number.base": "Quantity butun son bo'lishi kerak",
      "number.integer": "Quantity faqat butun son bo'lishi kerak",
      "number.min": "Quantity kamida 1 bo'lishi kerak",
      "any.required": "Quantity kiritilishi majburiy",
    }),
  });

  return cartItemSchema.validate(data, { abortEarly: false });
};
