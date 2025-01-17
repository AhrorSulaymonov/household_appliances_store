const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Product = require("./products");
const Discount = require("./discounts");

const ProductDiscount = sequelize.define(
  "product_discount",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true, // createdAt va updatedAt qo'shiladi
  }
);

// Many-to-Many bog'lanishlar
Product.belongsToMany(Discount, { through: ProductDiscount });
Discount.belongsToMany(Product, { through: ProductDiscount });

// One-to-Many bog'lanishlar
Product.hasMany(ProductDiscount, {
  onDelete: "CASCADE", // Agar asosiy jadvaldagi product o'chirilsa, bog'liq yozuvlarni ham o'chirish
});
ProductDiscount.belongsTo(Product, {
  onDelete: "CASCADE", // Bog'liq yozuvlarni avtomatik o'chirish
});

Discount.hasMany(ProductDiscount, {
  onDelete: "CASCADE", // Agar asosiy jadvaldagi discount o'chirilsa, bog'liq yozuvlarni o'chirish
});
ProductDiscount.belongsTo(Discount, {
  onDelete: "CASCADE", // Bog'liq yozuvlarni avtomatik o'chirish
});

module.exports = ProductDiscount;
