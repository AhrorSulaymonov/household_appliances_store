const { errorHandler } = require("../helpers/error_handler");
const Image = require("../models/images");
const Product = require("../models/products");
const { productValidation } = require("../validations/product.validation");

const addProduct = async (req, res) => {
  try {
    const { error, value } = productValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const newProduct = await Product.create(value);
    res.status(201).send({ newProduct });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: Image });
    res.status(200).send({ products });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ where: { id } });
    res.status(200).send({ product });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateProductById = async (req, res) => {
  try {
    const { error, value } = productValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const id = req.params.id;
    const product = await Product.update(value, {
      where: { id },
      returning: true,
    });
    res.status(200).send({ product: product[1] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.destroy({ where: { id } });
    res.status(200).send({ deleted: !!product });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addProduct,
  findAllProducts,
  findProductById,
  updateProductById,
  deleteProductById,
};
