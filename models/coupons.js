const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Coupon = sequelize.define(
  "coupon",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Coupon code cannot be null",
        },
        notEmpty: {
          msg: "Coupon code cannot be empty",
        },
        len: {
          args: [5, 255],
          msg: "Coupon code must be between 5 and 255 characters",
        },
      },
    },
    discount_type: {
      type: DataTypes.ENUM("percent", "fixed"),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Discount type cannot be null",
        },
      },
    },
    discount_value: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Discount value cannot be null",
        },
        isDecimal: {
          msg: "Discount value must be a valid decimal number",
        },
        min: {
          args: [0],
          msg: "Discount value must be greater than or equal to 0",
        },
      },
    },
    min_purchase: {
      type: DataTypes.DECIMAL(15, 2),
      validate: {
        isDecimal: {
          msg: "Min purchase must be a valid decimal number",
        },
        min: {
          args: [0],
          msg: "Min purchase must be greater than or equal to 0",
        },
      },
    },
    valid_from: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Valid from date cannot be null",
        },
        isDate: {
          msg: "Valid from date must be a valid date",
        },
      },
    },
    valid_to: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Valid to date cannot be null",
        },
        isDate: {
          msg: "Valid to date must be a valid date",
        },
        isAfterCurrentDate(value) {
          if (new Date(value) <= new Date(this.valid_from)) {
            throw new Error("End date must be after start date");
          }
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

module.exports = Coupon;
