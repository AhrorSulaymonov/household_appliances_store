const Joi = require("joi");

exports.couponValidation = (data) => {
  const couponSchema = Joi.object({
    code: Joi.string().min(5).max(255).required().messages({
      "string.base": "Kupon kodi matn bo'lishi kerak",
      "string.empty": "Kupon kodi bo'sh bo'lmasligi kerak",
      "string.min": "Kupon kodi kamida 5 belgidan iborat bo'lishi kerak",
      "string.max": "Kupon kodi 255 belgidan oshmasligi kerak",
      "any.required": "Kupon kodi majburiy",
    }),

    discount_type: Joi.string().valid("percent", "fixed").required().messages({
      "string.base": "Chegirma turi matn bo'lishi kerak",
      "any.only": "Chegirma turi 'percent' yoki 'fixed' bo'lishi kerak",
      "any.required": "Chegirma turi majburiy",
    }),

    discount_value: Joi.number().required().min(0).messages({
      "number.base": "Chegirma qiymati to'g'ri raqam bo'lishi kerak",
      "number.min": "Chegirma qiymati 0 dan kichik bo'lmasligi kerak",
      "any.required": "Chegirma qiymati majburiy",
    }),

    min_purchase: Joi.number().min(0).messages({
      "number.base": "Minimal xarid summasi to'g'ri raqam bo'lishi kerak",
      "number.min": "Minimal xarid summasi 0 dan kichik bo'lmasligi kerak",
    }),

    valid_from: Joi.date().required().messages({
      "date.base": "Boshlanish sanasi to'g'ri sana bo'lishi kerak",
      "any.required": "Boshlanish sanasi majburiy",
    }),

    valid_to: Joi.date().required().greater(Joi.ref("valid_from")).messages({
      "date.base": "Tugash sanasi to'g'ri sana bo'lishi kerak",
      "any.required": "Tugash sanasi majburiy",
      "date.greater": "Tugash sanasi boshlanish sanasidan keyin bo'lishi kerak",
    }),

    is_active: Joi.boolean().default(true).messages({
      "boolean.base": "is_active maydoni boolean bo'lishi kerak",
    }),
  });

  return couponSchema.validate(data, { abortEarly: false });
};
