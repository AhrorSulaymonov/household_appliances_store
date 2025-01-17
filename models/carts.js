const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Customer = require("./customers");

const Cart = sequelize.define(
  "cart",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM("Active", "Completed"),
      defaultValue: "Active",
      allowNull: false,
      validate: {
        notNull: { msg: "Status cannot be null" },
        notEmpty: { msg: "Status cannot be empty" },
        isIn: {
          args: [["Active", "Completed"]],
          msg: "Status must be 'Active' or 'Completed'",
        },
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Cart.belongsTo(Customer);
Customer.hasOne(Cart);

module.exports = Cart;
