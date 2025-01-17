const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Product = require("./products");
const Cart = require("./carts");

const CartItem = sequelize.define(
  "cart_item",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Quantity cannot be null" },
        notEmpty: { msg: "Quantity cannot be empty" },
        min: {
          args: [1],
          msg: "Quantity must be at least 1",
        },
        isInt: { msg: "Quantity must be an integer" },
      },
    },
  },
  {
    freezeTableName: true,
  }
);

CartItem.belongsTo(Product);
CartItem.belongsTo(Cart);

Cart.hasMany(CartItem);
Product.hasMany(CartItem);

module.exports = CartItem;
