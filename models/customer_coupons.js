const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Customer = require("./customers");
const Coupon = require("./coupons");

const CustomerCoupon = sequelize.define(
  "customer_coupon",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    issued_date: {
      type: DataTypes.DATE,
    },
    is_used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    used_date: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);

// Relationships with onDelete
Customer.belongsToMany(Coupon, {
  through: CustomerCoupon,
  onDelete: "CASCADE",
});
Coupon.belongsToMany(Customer, {
  through: CustomerCoupon,
  onDelete: "CASCADE",
});

Customer.hasMany(CustomerCoupon);
CustomerCoupon.belongsTo(Customer);

Coupon.hasMany(CustomerCoupon);
CustomerCoupon.belongsTo(Coupon);

module.exports = CustomerCoupon;
