const { errorHandler } = require("../helpers/error_handler");
const Brand = require("../models/brands");
const { brandValidation } = require("../validations/brand.validation");
const bcrypt = require("bcrypt");

const addBrand = async (req, res) => {
  try {
    const { error, value } = brandValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const newBrand = await Brand.create(value);
    res.status(201).send({ newBrand });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllBrands = async (req, res) => {
  try {
    const brands = await Brand.findAll();
    res.status(200).send({ brands });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findBrandById = async (req, res) => {
  try {
    const id = req.params.id;
    const brand = await Brand.findOne({ where: { id } });
    if (!brand) return res.status(404).send({ message: "Brand not found" });
    res.status(200).send({ brand });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateBrandById = async (req, res) => {
  try {
    const { error, value } = brandValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const id = req.params.id;
    const brand = await Brand.update(value, { where: { id }, returning: true });
    if (brand[1].length === 0)
      return res.status(404).send({ message: "Brand not found" });
    res.status(200).send({ brand: brand[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteBrandById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Brand.destroy({ where: { id } });
    if (!deleted) return res.status(404).send({ message: "Brand not found" });
    res.status(200).send({ deleted: true });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addBrand,
  findAllBrands,
  findBrandById,
  updateBrandById,
  deleteBrandById,
};
