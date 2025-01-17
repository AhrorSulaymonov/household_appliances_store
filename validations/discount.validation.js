const Joi = require("joi");

exports.discountValidation = (data) => {
  const discountSchema = Joi.object({
    id: Joi.number().integer().positive().messages({
      "number.base": "ID raqam bo'lishi kerak",
      "number.integer": "ID butun son bo'lishi kerak",
      "number.positive": "ID musbat bo'lishi kerak",
    }),
    discount_name: Joi.string().min(3).max(255).required().messages({
      "string.base": "Discount name matn bo'lishi kerak",
      "string.empty": "Discount name bo'sh bo'lishi mumkin emas",
      "string.min": "Discount name kamida 3 ta belgidan iborat bo'lishi kerak",
      "string.max": "Discount name 255 ta belgidan oshmasligi kerak",
      "any.required": "Discount name kiritilishi shart",
    }),
    discount_value: Joi.number().positive().precision(2).required().messages({
      "number.base": "Discount value raqam bo'lishi kerak",
      "number.positive": "Discount value musbat bo'lishi kerak",
      "number.precision":
        "Discount value ikkita kasr o'nlikdan iborat bo'lishi kerak",
      "any.required": "Discount value kiritilishi shart",
    }),
    start_date: Joi.date().iso().greater("now").required().messages({
      "date.base": "Start date to'g'ri sana formatida bo'lishi kerak",
      "date.iso": "Start date ISO formatida bo'lishi kerak",
      "date.greater": "Start date kelajakdagi sana bo'lishi kerak",
      "any.required": "Start date kiritilishi shart",
    }),
    end_date: Joi.date()
      .iso()
      .greater(Joi.ref("start_date"))
      .required()
      .messages({
        "date.base": "End date to'g'ri sana formatida bo'lishi kerak",
        "date.iso": "End date ISO formatida bo'lishi kerak",
        "date.greater": "End date start date dan keyin bo'lishi kerak",
        "any.required": "End date kiritilishi shart",
      }),
    discount_type: Joi.string().valid("percent", "fixed").required().messages({
      "string.base": "Discount type matn bo'lishi kerak",
      "any.only":
        "Discount type faqat 'percent' yoki 'fixed' qiymatiga ega bo'lishi kerak",
      "any.required": "Discount type kiritilishi shart",
    }),
    is_active: Joi.boolean().messages({
      "boolean.base": "Is active boolean qiymat bo'lishi kerak",
    }),
  });

  return discountSchema.validate(data, { abortEarly: false });
};
