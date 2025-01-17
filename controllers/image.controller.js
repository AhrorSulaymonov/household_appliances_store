const { errorHandler } = require("../helpers/error_handler");
const Image = require("../models/images");
const { imageValidation } = require("../validations/image.validation");

const addImage = async (req, res) => {
  try {
    const { error, value } = imageValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const newImage = await Image.create(value);
    res.status(201).send({ newImage });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllImages = async (req, res) => {
  try {
    const images = await Image.findAll();
    res.status(200).send({ images });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findImageById = async (req, res) => {
  try {
    const id = req.params.id;
    const image = await Image.findOne({ where: { id } });
    res.status(200).send({ image });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateImageById = async (req, res) => {
  try {
    const { error, value } = imageValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const id = req.params.id;
    const image = await Image.update(value, { where: { id }, returning: true });
    res.status(200).send({ image: image[1] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteImageById = async (req, res) => {
  try {
    const id = req.params.id;
    const image = await Image.destroy({ where: { id } });
    res.status(200).send({ deleted: !!image });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addImage,
  findAllImages,
  findImageById,
  updateImageById,
  deleteImageById,
};
