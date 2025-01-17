const Joi = require("joi");

exports.feedbackValidation = (data) => {
  const feedbackSchema = Joi.object({
    id: Joi.number().integer().positive().messages({
      "number.base": "ID raqam bo'lishi kerak",
      "number.integer": "ID butun son bo'lishi kerak",
      "number.positive": "ID musbat son bo'lishi kerak",
    }),
    rating: Joi.number().min(1).max(5).required().messages({
      "number.base": "Rating son bo'lishi kerak",
      "number.min": "Rating 1 dan kam bo'lmasligi kerak",
      "number.max": "Rating 5 dan oshmasligi kerak",
      "any.required": "Rating kiritilishi shart",
    }),
    comment: Joi.string().min(10).max(500).required().messages({
      "string.base": "Comment matn bo'lishi kerak",
      "string.empty": "Comment bo'sh bo'lishi mumkin emas",
      "string.min": "Comment kamida 10 ta belgidan iborat bo'lishi kerak",
      "string.max": "Comment 500 ta belgidan oshmasligi kerak",
      "any.required": "Comment kiritilishi shart",
    }),
    customerId: Joi.number().integer().positive().required().messages({
      "number.base": "Customer ID raqam bo'lishi kerak",
      "number.integer": "Customer ID butun son bo'lishi kerak",
      "number.positive": "Customer ID musbat son bo'lishi kerak",
      "any.required": "Customer ID kiritilishi shart",
    }),
    productId: Joi.number().integer().positive().required().messages({
      "number.base": "Product ID raqam bo'lishi kerak",
      "number.integer": "Product ID butun son bo'lishi kerak",
      "number.positive": "Product ID musbat son bo'lishi kerak",
      "any.required": "Product ID kiritilishi shart",
    }),
  });

  return feedbackSchema.validate(data, { abortEarly: false });
};
