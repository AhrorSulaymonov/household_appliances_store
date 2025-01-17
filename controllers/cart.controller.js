const { errorHandler } = require("../helpers/error_handler");
const Cart = require("../models/carts");
const { cartValidation } = require("../validations/cart.validation");

const addCart = async (req, res) => {
  try {
    const { error, value } = cartValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const { customerId, status } = req.body;
    const newCart = await Cart.create(value);
    res.status(201).send({ newCart });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllCarts = async (req, res) => {
  try {
    const carts = await Cart.findAll();
    res.status(200).send({ carts });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findCartById = async (req, res) => {
  try {
    const id = req.params.id;
    const cart = await Cart.findOne({ where: { id } });
    if (!cart) return res.status(404).send({ message: "Cart not found" });
    res.status(200).send({ cart });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateCartById = async (req, res) => {
  try {
    const { error, value } = cartValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const id = req.params.id;
    const cart = await Cart.update(value, { where: { id }, returning: true });
    if (cart[1].length === 0)
      return res.status(404).send({ message: "Cart not found" });
    res.status(200).send({ cart: cart[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteCartById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Cart.destroy({ where: { id } });
    if (!deleted) return res.status(404).send({ message: "Cart not found" });
    res.status(200).send({ deleted: true });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addCart,
  findAllCarts,
  findCartById,
  updateCartById,
  deleteCartById,
};
