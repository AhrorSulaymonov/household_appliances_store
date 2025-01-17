const Joi = require("joi");

exports.contractValidation = (data) => {
  const contractSchema = Joi.object({
    start_date: Joi.date().messages({
      "date.base": "Start date haqiqiy sana bo'lishi kerak",
    }),

    coupon_code: Joi.string().min(1).max(255).messages({
      "string.base": "coupon code matn bo'lishi kerak",
      "string.min": "coupon code kamida 1 ta belgidan iborat bo'lishi kerak",
      "string.max": "coupon code 255 ta belgidan oshmasligi kerak",
    }),

    down_payment: Joi.number().min(0).messages({
      "number.base": "Down payment haqiqiy raqam bo'lishi kerak",
      "number.min": "Down payment kamida 0 bo'lishi kerak",
    }),

    total_amount: Joi.number().min(0).messages({
      "number.base": "Total amount haqiqiy raqam bo'lishi kerak",
      "number.min": "Total amount kamida 0 bo'lishi kerak",
    }),

    customerId: Joi.number().required().messages({
      "number.base": "Customer ID haqiqiy raqam bo'lishi kerak",
      "any.required": "Customer ID kiritilishi majburiy",
    }),

    adminId: Joi.number().required().messages({
      "number.base": "Admin ID haqiqiy raqam bo'lishi kerak",
      "any.required": "Admin ID kiritilishi majburiy",
    }),

    installmentPlanId: Joi.number().required().messages({
      "number.base": "Installment plan ID haqiqiy raqam bo'lishi kerak",
      "any.required": "Installment plan ID kiritilishi majburiy",
    }),

    payment_date: Joi.number().required().messages({
      "number.base": "Payment date haqiqiy son bo'lishi kerak",
      "any.required": "Payment date kiritilishi shart",
    }),

    contractStatusId: Joi.number().required().messages({
      "number.base": "Contract status ID haqiqiy raqam bo'lishi kerak",
      "any.required": "Contract status ID kiritilishi majburiy",
    }),
  });

  return contractSchema.validate(data, { abortEarly: false });
};
