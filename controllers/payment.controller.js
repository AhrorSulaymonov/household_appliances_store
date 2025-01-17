const { errorHandler } = require("../helpers/error_handler");
const Payment = require("../models/payments");
const { paymentValidation } = require("../validations/payment.validation");

const addPayment = async (req, res) => {
  try {
    const { error, value } = paymentValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const newPayment = await Payment.create(value);
    res.status(201).send({ newPayment });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.status(200).send({ payments });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findPaymentById = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await Payment.findOne({ where: { id } });
    res.status(200).send({ payment });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updatePaymentById = async (req, res) => {
  try {
    const { error, value } = paymentValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const id = req.params.id;
    const payment = await Payment.update(value, {
      where: { id },
      returning: true,
    });
    res.status(200).send({ payment: payment[1] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deletePaymentById = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await Payment.destroy({ where: { id } });
    res.status(200).send({ deleted: !!payment });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addPayment,
  findAllPayments,
  findPaymentById,
  updatePaymentById,
  deletePaymentById,
};
