const { DataTypes, Op } = require("sequelize");
const sequelize = require("../config/db");

const Admin = sequelize.define(
  "admin",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: { msg: "First name cannot be null" },
        notEmpty: { msg: "First name cannot be empty" },
        len: {
          args: [2, 50],
          msg: "First name must be between 2 and 50 characters",
        },
      },
    },
    last_name: {
      type: DataTypes.STRING(50),
      validate: {
        len: {
          args: [2, 50],
          msg: "Last name must be between 2 and 50 characters",
        },
      },
    },
    phone: {
      type: DataTypes.STRING(15),
      unique: true,
      allowNull: false,
      validate: {
        notNull: { msg: "Phone number cannot be null" },
        notEmpty: { msg: "Phone number cannot be empty" },
        is: {
          args: [/^\d{2}-\d{3}-\d{2}-\d{2}$/],
          msg: "Phone number format must be XX-XXX-XX-XX (e.g., 99-123-45-67)",
        },
      },
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "Username cannot be null" },
        notEmpty: { msg: "Username cannot be empty" },
        len: {
          args: [4, 50],
          msg: "Username must be between 4 and 50 characters",
        },
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "Email cannot be null" },
        notEmpty: { msg: "Email cannot be empty" },
        isEmail: { msg: "Must be a valid email address" },
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: { msg: "Password cannot be null" },
        notEmpty: { msg: "Password cannot be empty" },
        len: {
          args: [6, 255],
          msg: "Password must be at least 6 characters long",
        },
      },
    },
    is_creator: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    refresh_token: {
      type: DataTypes.STRING(255),
      validate: {
        len: {
          args: [0, 255],
          msg: "Refresh token must not exceed 255 characters",
        },
      },
    },
    verification: {
      type: DataTypes.STRING(255),
      validate: {
        len: {
          args: [0, 255],
          msg: "Verification code must not exceed 255 characters",
        },
      },
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Admin;
