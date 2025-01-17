const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const PaymentStatus = require("./payment_statuses");
const PaymentMethod = require("./payment_methods");
const Contract = require("./contracts");

const Payment = sequelize.define(
  "payment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Payment date cannot be null",
        },
        isDate: {
          msg: "Payment date must be a valid date",
        },
      },
    },
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Amount cannot be null",
        },
        isDecimal: {
          msg: "Amount must be a valid decimal number",
        },
        min: {
          args: [0],
          msg: "Amount must be a positive number",
        },
      },
    },
  },
  {
    freezeTableName: true,
  }
);

// BelongsTo bog'lanishlar
Payment.belongsTo(PaymentStatus, {
  onDelete: "CASCADE", // PaymentStatus o'chirilganda bog'liq yozuvlarni o'chirish
});

Payment.belongsTo(PaymentMethod, {
  onDelete: "CASCADE", // PaymentMethod o'chirilganda bog'liq yozuvlarni o'chirish
});


// HasMany bog'lanishlar
PaymentStatus.hasMany(Payment);
PaymentMethod.hasMany(Payment);

module.exports = Payment;
