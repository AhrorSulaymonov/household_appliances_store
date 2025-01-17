const { errorHandler } = require("../helpers/error_handler");
const Coupon = require("../models/coupons");
const { couponValidation } = require("../validations/coupon.validation");

const addCoupon = async (req, res) => {
  try {
    const { error, value } = couponValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const newCoupon = await Coupon.create(value);
    res.status(201).send({ newCoupon });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.findAll();
    res.status(200).send({ coupons });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findCouponById = async (req, res) => {
  try {
    const id = req.params.id;
    const coupon = await Coupon.findOne({ where: { id } });
    res.status(200).send({ coupon });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateCouponById = async (req, res) => {
  try {
    const { error, value } = couponValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const id = req.params.id;
    const coupon = await Coupon.update(value, {
      where: { id },
      returning: true,
    });
    res.status(200).send({ coupon: coupon[1] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteCouponById = async (req, res) => {
  try {
    const id = req.params.id;
    const coupon = await Coupon.destroy({ where: { id } });
    res.status(200).send({ deleted: !!coupon });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addCoupon,
  findAllCoupons,
  findCouponById,
  updateCouponById,
  deleteCouponById,
};
