const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Discount = sequelize.define(
  "discount",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    discount_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Discount name cannot be null",
        },
        notEmpty: {
          msg: "Discount name cannot be empty",
        },
        len: {
          args: [3, 255],
          msg: "Discount name must be between 3 and 255 characters",
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
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Start date cannot be null",
        },
        isDate: {
          msg: "Start date must be a valid date",
        },
        isAfter: {
          args: [new Date().toISOString()],
          msg: "Start date must be in the future",
        },
      },
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "End date cannot be null",
        },
        isDate: {
          msg: "End date must be a valid date",
        },
        isAfterCurrentDate(value) {
          if (new Date(value) <= new Date(this.start_date)) {
            throw new Error("End date must be after start date");
          }
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
        isIn: {
          args: [["percent", "fixed"]],
          msg: "Discount type must be 'percent' or 'fixed'",
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

module.exports = Discount;
