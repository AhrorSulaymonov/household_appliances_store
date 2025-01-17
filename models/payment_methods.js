const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PaymentMethod = sequelize.define(
  "payment_method",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
        msg: "Name must be unique",
      },
      validate: {
        notNull: {
          msg: "Name cannot be null",
        },
        notEmpty: {
          msg: "Name cannot be empty",
        },
        len: {
          args: [3, 255],
          msg: "Name must be between 3 and 255 characters",
        },
      },
    },
    method_logo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Method logo cannot be null",
        },
        notEmpty: {
          msg: "Method logo cannot be empty",
        },
        len: {
          args: [3, 255],
          msg: "Method logo must be between 3 and 255 characters",
        },
      },
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = PaymentMethod;
