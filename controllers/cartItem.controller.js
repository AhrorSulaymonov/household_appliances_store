const { errorHandler } = require("../helpers/error_handler");
const CartItem = require("../models/cart_items");
const { cartItemValidation } = require("../validations/cartItem.validation");

const addCartItem = async (req, res) => {
  try {
    const { error, value } = cartItemValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const newCartItem = await CartItem.create(value);
    res.status(201).send({ newCartItem });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.findAll();
    res.status(200).send({ cartItems });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findCartItemById = async (req, res) => {
  try {
    const id = req.params.id;
    const cartItem = await CartItem.findOne({ where: { id } });
    if (!cartItem)
      return res.status(404).send({ message: "CartItem not found" });
    res.status(200).send({ cartItem });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateCartItemById = async (req, res) => {
  try {
    const { error, value } = cartItemValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const id = req.params.id;
    const cartItem = await CartItem.update(value, {
      where: { id },
      returning: true,
    });
    if (cartItem[1].length === 0)
      return res.status(404).send({ message: "CartItem not found" });
    res.status(200).send({ cartItem: cartItem[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteCartItemById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await CartItem.destroy({ where: { id } });
    if (!deleted)
      return res.status(404).send({ message: "CartItem not found" });
    res.status(200).send({ deleted: true });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addCartItem,
  findAllCartItems,
  findCartItemById,
  updateCartItemById,
  deleteCartItemById,
};
