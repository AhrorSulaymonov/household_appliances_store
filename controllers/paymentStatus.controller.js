const { errorHandler } = require("../helpers/error_handler");
const PaymentStatus = require("../models/payment_statuses");
const {
  paymentStatusValidation,
} = require("../validations/paymentStatus.validation");

const addPaymentStatus = async (req, res) => {
  try {
    const { error, value } = paymentStatusValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const newPaymentStatus = await PaymentStatus.create(value);
    res.status(201).send({ newPaymentStatus });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllPaymentStatuses = async (req, res) => {
  try {
    const paymentStatuses = await PaymentStatus.findAll();
    res.status(200).send({ paymentStatuses });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findPaymentStatusById = async (req, res) => {
  try {
    const id = req.params.id;
    const paymentStatus = await PaymentStatus.findOne({ where: { id } });
    res.status(200).send({ paymentStatus });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updatePaymentStatusById = async (req, res) => {
  try {
    const { error, value } = paymentStatusValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const id = req.params.id;
    const paymentStatus = await PaymentStatus.update(value, {
      where: { id },
      returning: true,
    });
    res.status(200).send({ paymentStatus: paymentStatus[1] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deletePaymentStatusById = async (req, res) => {
  try {
    const id = req.params.id;
    const paymentStatus = await PaymentStatus.destroy({ where: { id } });
    res.status(200).send({ deleted: !!paymentStatus });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addPaymentStatus,
  findAllPaymentStatuses,
  findPaymentStatusById,
  updatePaymentStatusById,
  deletePaymentStatusById,
};
