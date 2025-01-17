const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ContractStatus = sequelize.define(
  "contract_status",
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
          args: [3, 255],
          msg: "Name must be between 3 and 255 characters",
        },
      },
    },
    description: {
      type: DataTypes.STRING(255),
      validate: {
        len: {
          args: [0, 255],
          msg: "Description must not exceed 255 characters",
        },
      },
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = ContractStatus;
