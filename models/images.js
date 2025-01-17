const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Product = require("./products");

const Image = sequelize.define(
  "image",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Image URL cannot be null",
        },
        notEmpty: {
          msg: "Image URL cannot be empty",
        },
        isUrl: {
          msg: "Image URL must be a valid URL",
        },
      },
    },
    is_main: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
  }
);

// Relationships
Image.belongsTo(Product, {
  onDelete: "CASCADE",
});
Product.hasMany(Image);

module.exports = Image;
