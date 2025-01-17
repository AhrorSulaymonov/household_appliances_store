const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Product = require("./products");
const Contract = require("./contracts");

const ContractItem = sequelize.define(
  "contract_item",
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
        notNull: {
          msg: "Quantity cannot be null",
        },
        isInt: {
          msg: "Quantity must be an integer",
        },
        min: {
          args: [1],
          msg: "Quantity must be greater than or equal to 1",
        },
      },
    },
  },
  {
    freezeTableName: true,
  }
);

ContractItem.belongsTo(Product);
ContractItem.belongsTo(Contract);

Product.hasMany(ContractItem);
Contract.hasMany(ContractItem);

module.exports = ContractItem;
