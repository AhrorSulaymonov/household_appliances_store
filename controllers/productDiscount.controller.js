const { errorHandler } = require("../helpers/error_handler");
const ProductDiscount = require("../models/product_discounts");
const {
  productDiscountValidation,
} = require("../validations/productDiscount.validation");

const addProductDiscount = async (req, res) => {
  try {
    const { error, value } = productDiscountValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const newProductDiscount = await ProductDiscount.create(value);
    res.status(201).send({ newProductDiscount });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllProductDiscounts = async (req, res) => {
  try {
    const productDiscounts = await ProductDiscount.findAll();
    res.status(200).send({ productDiscounts });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findProductDiscountById = async (req, res) => {
  try {
    const id = req.params.id;
    const productDiscount = await ProductDiscount.findOne({ where: { id } });
    res.status(200).send({ productDiscount });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateProductDiscountById = async (req, res) => {
  try {
    const { error, value } = productDiscountValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const id = req.params.id;
    const productDiscount = await ProductDiscount.update(value, {
      where: { id },
      returning: true,
    });
    res.status(200).send({ productDiscount: productDiscount[1] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteProductDiscountById = async (req, res) => {
  try {
    const id = req.params.id;
    const productDiscount = await ProductDiscount.destroy({ where: { id } });
    res.status(200).send({ deleted: !!productDiscount });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addProductDiscount,
  findAllProductDiscounts,
  findProductDiscountById,
  updateProductDiscountById,
  deleteProductDiscountById,
};
