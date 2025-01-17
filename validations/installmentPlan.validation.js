const Joi = require("joi");

exports.installmentPlanValidation = (data) => {
  const installmentPlanSchema = Joi.object({
    id: Joi.number().integer().positive().messages({
      "number.base": "ID raqam bo'lishi kerak",
      "number.integer": "ID butun son bo'lishi kerak",
      "number.positive": "ID musbat son bo'lishi kerak",
    }),
    duration_months: Joi.number().integer().min(1).required().messages({
      "number.base": "Duration in months raqam bo'lishi kerak",
      "number.integer": "Duration in months butun son bo'lishi kerak",
      "number.min": "Duration in months kamida 1 bo'lishi kerak",
      "any.required": "Duration in months kiritilishi shart",
    }),
    interest_rate: Joi.number().min(0).max(100).required().messages({
      "number.base": "Interest rate raqam bo'lishi kerak",
      "number.min": "Interest rate manfiy bo'lishi mumkin emas",
      "number.max": "Interest rate 100% dan oshmasligi kerak",
      "any.required": "Interest rate kiritilishi shart",
    }),
  });

  return installmentPlanSchema.validate(data, { abortEarly: false });
};
