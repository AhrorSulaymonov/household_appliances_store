const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Customer = require("./customers");
const Admin = require("./admins");
const InstallmentPlan = require("./installment_plans");
const ContractStatus = require("./contract_statuses");
const Coupon = require("./coupons");
const Payment = require("./payments");

const Contract = sequelize.define(
  "contract",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Start date cannot be null",
        },
        isDate: {
          msg: "Start date must be a valid date",
        },
      },
    },
    coupon_code: {
      type: DataTypes.STRING(255),
      validate: {
        len: {
          args: [1, 255],
          msg: "Name must be between 1 and 255 characters",
        },
      },
    },
    down_payment: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Down payment cannot be null",
        },
        isDecimal: {
          msg: "Down payment must be a valid decimal number",
        },
        min: {
          args: [0],
          msg: "Down payment must be greater than or equal to 0",
        },
      },
    },
    total_amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Total amount cannot be null",
        },
        isDecimal: {
          msg: "Total amount must be a valid decimal number",
        },
        min: {
          args: [0],
          msg: "Total amount must be greater than or equal to 0",
        },
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Contract.belongsTo(Customer, {
  onDelete: "SET NULL",
});
Contract.belongsTo(Admin, {
  onDelete: "SET NULL",
});
Contract.belongsTo(InstallmentPlan, {
  onDelete: "SET NULL",
});
Contract.belongsTo(ContractStatus, {
  onDelete: "SET NULL",
});

// Contract modelidagi relationshipni o'zgartirish
Contract.belongsTo(Coupon, {
  foreignKey: {
    name: "coupon_code", // Contract jadvalidagi ustun nomi
    allowNull: true, // Kupon kodini optional qilish
  },
  targetKey: "code", // Coupon jadvalidagi ustun nomi
  onDelete: "SET NULL", // Kupon o'chirilganda kodni null qilish
});

// Coupon modeliga kerak bo'lsa hasMany ulanishini qo'shish
Coupon.hasMany(Contract, {
  foreignKey: "coupon_code", // Contract jadvalidagi ustun nomi
  sourceKey: "code", // Coupon jadvalidagi ustun nomi
});

Customer.hasMany(Contract);
Admin.hasMany(Contract);
InstallmentPlan.hasMany(Contract);
ContractStatus.hasMany(Contract);

Contract.hasMany(Payment);
Payment.belongsTo(Contract);

module.exports = Contract;
