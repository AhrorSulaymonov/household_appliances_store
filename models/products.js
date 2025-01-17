const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Category = require("./categories");
const Brand = require("./brands");
const Color = require("./colors");

const Product = sequelize.define(
  "product",
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
    price: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price cannot be null",
        },
        isDecimal: {
          msg: "Price must be a valid decimal number",
        },
        min: {
          args: [0],
          msg: "Price must be greater than or equal to 0",
        },
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Stock cannot be null",
        },
        isInt: {
          msg: "Stock must be an integer value",
        },
        min: {
          args: [0],
          msg: "Stock must be greater than or equal to 0",
        },
      },
    },
  },
  {
    freezeTableName: true,
  }
);

// Relationships
Product.belongsTo(Category);
Product.belongsTo(Brand);
Product.belongsTo(Color);

Category.hasMany(Product);
Brand.hasMany(Product);
Color.hasMany(Product);

module.exports = Product;
