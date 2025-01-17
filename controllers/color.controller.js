const { errorHandler } = require("../helpers/error_handler");
const Color = require("../models/colors");
const { colorValidation } = require("../validations/color.validation");

const addColor = async (req, res) => {
  try {
    const { error, value } = colorValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const newColor = await Color.create(value);
    res.status(201).send({ newColor });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllColors = async (req, res) => {
  try {
    const colors = await Color.findAll();
    res.status(200).send({ colors });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findColorById = async (req, res) => {
  try {
    const id = req.params.id;
    const color = await Color.findOne({ where: { id } });
    res.status(200).send({ color });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateColorById = async (req, res) => {
  try {
    const { error, value } = colorValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const id = req.params.id;
    const color = await Color.update(value, { where: { id }, returning: true });
    res.status(200).send({ color: color[1] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteColorById = async (req, res) => {
  try {
    const id = req.params.id;
    const color = await Color.destroy({ where: { id } });
    res.status(200).send({ deleted: !!color });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addColor,
  findAllColors,
  findColorById,
  updateColorById,
  deleteColorById,
};
