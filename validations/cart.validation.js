const Joi = require("joi");

exports.cartValidation = (data) => {
  const cartSchema = Joi.object({
    customerId: Joi.number().integer().required().messages({
      "number.base": "Customer ID butun son bo'lishi kerak",
      "number.integer": "Customer ID faqat butun son bo'lishi kerak",
      "any.required": "Customer ID kiritilishi majburiy",
    }),
    status: Joi.string().valid("Active", "Completed").required().messages({
      "string.base": "Status matn bo'lishi kerak",
      "string.empty": "Status bo'sh bo'lishi mumkin emas",
      "any.only": "Status faqat 'Active' yoki 'Completed' bo'lishi mumkin",
      "any.required": "Status kiritilishi majburiy",
    }),
  });

  return cartSchema.validate(data, { abortEarly: false });
};
