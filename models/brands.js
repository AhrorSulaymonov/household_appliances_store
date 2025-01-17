const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Brand = sequelize.define(
  "brand",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Brand name cannot be null",
        },
        notEmpty: {
          msg: "Brand name cannot be empty",
        },
        len: {
          args: [1, 50],
          msg: "Brand name must be between 1 and 50 characters",
        },
      },
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Brand;
