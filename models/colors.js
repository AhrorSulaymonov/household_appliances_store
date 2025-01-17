const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Color = sequelize.define(
  "color",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name cannot be null",
        },
        notEmpty: {
          msg: "Name cannot be empty",
        },
        len: {
          args: [1, 255],
          msg: "Name must be between 1 and 255 characters",
        },
      },
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Color;
