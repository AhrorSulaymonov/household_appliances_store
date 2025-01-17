const Joi = require("joi");

exports.customerCouponValidation = (data) => {
  const customerCouponSchema = Joi.object({
    id: Joi.number().integer().positive().messages({
      "number.base": "ID raqam bo'lishi kerak",
      "number.integer": "ID butun son bo'lishi kerak",
      "number.positive": "ID musbat son bo'lishi kerak",
    }),
    issued_date: Joi.date().iso().required().messages({
      "date.base": "Issued date to'g'ri sana bo'lishi kerak",
      "date.format": "Issued date ISO formatda bo'lishi kerak",
      "any.required": "Issued date kiritilishi shart",
    }),
    is_used: Joi.boolean().default(false).messages({
      "boolean.base": "Is used qiymati true yoki false bo'lishi kerak",
    }),
    used_date: Joi.date().iso().allow(null).messages({
      "date.base": "Used date to'g'ri sana bo'lishi kerak",
      "date.format": "Used date ISO formatda bo'lishi kerak",
    }),
    customerId: Joi.number().integer().positive().required().messages({
      "number.base": "Customer ID raqam bo'lishi kerak",
      "number.integer": "Customer ID butun son bo'lishi kerak",
      "number.positive": "Customer ID musbat son bo'lishi kerak",
      "any.required": "Customer ID kiritilishi shart",
    }),
    couponId: Joi.number().integer().positive().required().messages({
      "number.base": "Coupon ID raqam bo'lishi kerak",
      "number.integer": "Coupon ID butun son bo'lishi kerak",
      "number.positive": "Coupon ID musbat son bo'lishi kerak",
      "any.required": "Coupon ID kiritilishi shart",
    }),
  });

  return customerCouponSchema.validate(data, { abortEarly: false });
};
