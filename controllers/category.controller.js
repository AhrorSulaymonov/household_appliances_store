const { errorHandler } = require("../helpers/error_handler");
const Category = require("../models/categories");
const { categoryValidation } = require("../validations/category.validation");

const addCategory = async (req, res) => {
  try {
    const { error, value } = categoryValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const newCategory = await Category.create(value);
    res.status(201).send({ newCategory });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).send({ categories });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findOne({ where: { id } });
    if (!category)
      return res.status(404).send({ message: "Category not found" });
    res.status(200).send({ category });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateCategoryById = async (req, res) => {
  try {
    const { error, value } = categoryValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const id = req.params.id;
    const category = await Category.update(value, {
      where: { id },
      returning: true,
    });
    if (category[1].length === 0)
      return res.status(404).send({ message: "Category not found" });
    res.status(200).send({ category: category[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Category.destroy({ where: { id } });
    if (!deleted)
      return res.status(404).send({ message: "Category not found" });
    res.status(200).send({ deleted: true });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addCategory,
  findAllCategories,
  findCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
