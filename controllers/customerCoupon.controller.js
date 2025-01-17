const { errorHandler } = require("../helpers/error_handler");
const CustomerCoupon = require("../models/customer_coupons");
const {
  customerCouponValidation,
} = require("../validations/customerCoupon.validation");

const addCustomerCoupon = async (req, res) => {
  try {
    const { error, value } = customerCouponValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const newCustomerCoupon = await CustomerCoupon.create(value);
    res.status(201).send({ newCustomerCoupon });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllCustomerCoupons = async (req, res) => {
  try {
    const customerCoupons = await CustomerCoupon.findAll();
    res.status(200).send({ customerCoupons });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findCustomerCouponById = async (req, res) => {
  try {
    const id = req.params.id;
    const customerCoupon = await CustomerCoupon.findOne({ where: { id } });
    if (!customerCoupon)
      return res.status(404).send({ message: "CustomerCoupon not found" });
    res.status(200).send({ customerCoupon });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateCustomerCouponById = async (req, res) => {
  try {
    const { error, value } = customerCouponValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const id = req.params.id;
    const customerCoupon = await CustomerCoupon.update(value, { where: { id }, returning: true });
    res.status(200).send({ customerCoupon: customerCoupon[1] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteCustomerCouponById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await CustomerCoupon.destroy({ where: { id } });
    if (!deleted)
      return res.status(404).send({ message: "CustomerCoupon not found" });
    res.status(200).send({ deleted: true });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addCustomerCoupon,
  findAllCustomerCoupons,
  findCustomerCouponById,
  updateCustomerCouponById,
  deleteCustomerCouponById,
};
