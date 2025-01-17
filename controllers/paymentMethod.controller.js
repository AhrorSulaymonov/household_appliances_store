const { errorHandler } = require("../helpers/error_handler");
const PaymentMethod = require("../models/payment_methods");
const {
  paymentMethodValidation,
} = require("../validations/paymentMethod.validation");

const addPaymentMethod = async (req, res) => {
  try {
    const { error, value } = paymentMethodValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const newPaymentMethod = await PaymentMethod.create(value);
    res.status(201).send({ newPaymentMethod });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.findAll();
    res.status(200).send({ paymentMethods });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findPaymentMethodById = async (req, res) => {
  try {
    const id = req.params.id;
    const paymentMethod = await PaymentMethod.findOne({ where: { id } });
    res.status(200).send({ paymentMethod });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updatePaymentMethodById = async (req, res) => {
  try {
    const { error, value } = paymentMethodValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const id = req.params.id;
    const paymentMethod = await PaymentMethod.update(value, {
      where: { id },
      returning: true,
    });
    res.status(200).send({ paymentMethod: paymentMethod[1] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deletePaymentMethodById = async (req, res) => {
  try {
    const id = req.params.id;
    const paymentMethod = await PaymentMethod.destroy({ where: { id } });
    res.status(200).send({ deleted: !!paymentMethod });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addPaymentMethod,
  findAllPaymentMethods,
  findPaymentMethodById,
  updatePaymentMethodById,
  deletePaymentMethodById,
};
