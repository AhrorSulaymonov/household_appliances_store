const Joi = require("joi");

exports.paymentValidation = (data) => {
  const paymentSchema = Joi.object({
    id: Joi.number().integer().positive().messages({
      "number.base": "ID raqam bo'lishi kerak",
      "number.integer": "ID butun son bo'lishi kerak",
      "number.positive": "ID musbat son bo'lishi kerak",
    }),
    payment_date: Joi.date().required().messages({
      "date.base": "Payment date haqiqiy sana bo'lishi kerak",
      "any.required": "Payment date kiritilishi shart",
    }),
    amount: Joi.number().precision(2).positive().required().messages({
      "number.base": "Amount raqam bo'lishi kerak",
      "number.positive": "Amount musbat son bo'lishi kerak",
      "any.required": "Amount kiritilishi shart",
      "number.precision": "Amount ikki kasrli raqam bo'lishi kerak",
    }),
    paymentStatusId: Joi.number().integer().positive().required().messages({
      "number.base": "Payment status ID raqam bo'lishi kerak",
      "number.integer": "Payment status ID butun son bo'lishi kerak",
      "number.positive": "Payment status ID musbat son bo'lishi kerak",
      "any.required": "Payment status ID kiritilishi shart",
    }),
    paymentMethodId: Joi.number().integer().positive().required().messages({
      "number.base": "Payment method ID raqam bo'lishi kerak",
      "number.integer": "Payment method ID butun son bo'lishi kerak",
      "number.positive": "Payment method ID musbat son bo'lishi kerak",
      "any.required": "Payment method ID kiritilishi shart",
    }),
    contractId: Joi.number().integer().positive().required().messages({
      "number.base": "Contract ID raqam bo'lishi kerak",
      "number.integer": "Contract ID butun son bo'lishi kerak",
      "number.positive": "Contract ID musbat son bo'lishi kerak",
      "any.required": "Contract ID kiritilishi shart",
    }),
  });

  return paymentSchema.validate(data, { abortEarly: false });
};
