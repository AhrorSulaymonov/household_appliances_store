const { errorHandler } = require("../helpers/error_handler");
const Feedback = require("../models/feedbacks");
const { feedbackValidation } = require("../validations/feedback.validation");

const addFeedback = async (req, res) => {
  try {
    const { error, value } = feedbackValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const newFeedback = await Feedback.create(value);
    res.status(201).send({ newFeedback });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll();
    res.status(200).send({ feedbacks });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findFeedbackById = async (req, res) => {
  try {
    const id = req.params.id;
    const feedback = await Feedback.findOne({ where: { id } });
    res.status(200).send({ feedback });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateFeedbackById = async (req, res) => {
  try {
    const { error, value } = feedbackValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const id = req.params.id;
    const feedback = await Feedback.update(value, { where: { id }, returning: true });
    res.status(200).send({ feedback: feedback[1] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteFeedbackById = async (req, res) => {
  try {
    const id = req.params.id;
    const feedback = await Feedback.destroy({ where: { id } });
    res.status(200).send({ deleted: !!feedback });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addFeedback,
  findAllFeedbacks,
  findFeedbackById,
  updateFeedbackById,
  deleteFeedbackById,
};
