const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const InstallmentPlan = sequelize.define(
  "installment_plan",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    duration_months: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Duration in months cannot be null",
        },
        isInt: {
          msg: "Duration in months must be an integer",
        },
        min: {
          args: [1],
          msg: "Duration in months must be at least 1",
        },
      },
    },
    interest_rate: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Interest rate cannot be null",
        },
        isDecimal: {
          msg: "Interest rate must be a decimal",
        },
        min: {
          args: [0],
          msg: "Interest rate cannot be negative",
        },
        max: {
          args: [100],
          msg: "Interest rate must be less than or equal to 100%",
        },
      },
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = InstallmentPlan;
