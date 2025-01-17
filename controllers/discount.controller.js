const { errorHandler } = require("../helpers/error_handler");
const Discount = require("../models/discounts");
const { discountValidation } = require("../validations/discount.validation");

const addDiscount = async (req, res) => {
  try {
    const { error, value } = discountValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const newDiscount = await Discount.create(value);
    res.status(201).send({ newDiscount });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.findAll();
    res.status(200).send({ discounts });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findDiscountById = async (req, res) => {
  try {
    const id = req.params.id;
    const discount = await Discount.findOne({ where: { id } });
    res.status(200).send({ discount });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateDiscountById = async (req, res) => {
  try {
    const { error, value } = discountValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const id = req.params.id;
    const discount = await Discount.update(value, {
      where: { id },
      returning: true,
    });
    res.status(200).send({ discount: discount[1] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteDiscountById = async (req, res) => {
  try {
    const id = req.params.id;
    const discount = await Discount.destroy({ where: { id } });
    res.status(200).send({ deleted: !!discount });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addDiscount,
  findAllDiscounts,
  findDiscountById,
  updateDiscountById,
  deleteDiscountById,
};
