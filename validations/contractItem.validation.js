const Joi = require("joi");

exports.contractItemValidation = (data) => {
  const contractItemSchema = Joi.object({
    quantity: Joi.number().integer().min(1).required().messages({
      "number.base": "Quantity raqam bo'lishi kerak",
      "number.integer": "Quantity butun son bo'lishi kerak",
      "number.min": "Quantity kamida 1 bo'lishi kerak",
      "any.required": "Quantity kiritilishi majburiy",
    }),
    productId: Joi.number().integer().required().messages({
      "number.base": "Product ID raqam bo'lishi kerak",
      "number.integer": "Product ID butun son bo'lishi kerak",
      "any.required": "Product ID kiritilishi majburiy",
    }),
    contractId: Joi.number().integer().required().messages({
      "number.base": "Contract ID raqam bo'lishi kerak",
      "number.integer": "Contract ID butun son bo'lishi kerak",
      "any.required": "Contract ID kiritilishi majburiy",
    }),
  });

  return contractItemSchema.validate(data, { abortEarly: false });
};
