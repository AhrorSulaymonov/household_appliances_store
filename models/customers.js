const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Customer = sequelize.define(
  "customer",
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
        notNull: {
          msg: "First name cannot be null",
        },
        notEmpty: {
          msg: "First name cannot be empty",
        },
        len: {
          args: [1, 50],
          msg: "First name must be between 1 and 50 characters",
        },
      },
    },
    last_name: {
      type: DataTypes.STRING(50),
      validate: {
        len: {
          args: [0, 50],
          msg: "Last name cannot exceed 50 characters",
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
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email cannot be null",
        },
        isEmail: {
          msg: "Email must be a valid email address",
        },
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password cannot be null",
        },
        len: {
          args: [6, 255],
          msg: "Password must be between 6 and 255 characters",
        },
      },
    },
    passport_number: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Passport number cannot be null",
        },
        notEmpty: {
          msg: "Passport number cannot be empty",
        },
        len: {
          args: [5, 255],
          msg: "Passport number must be between 5 and 255 characters",
        },
      },
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Address cannot be null",
        },
        notEmpty: {
          msg: "Address cannot be empty",
        },
        len: {
          args: [10, 255],
          msg: "Address must be between 10 and 255 characters",
        },
      },
    },
    refresh_token: {
      type: DataTypes.STRING(255),
      validate: {
        len: {
          args: [0, 255],
          msg: "Refresh token cannot exceed 255 characters",
        },
      },
    },
    verification: {
      type: DataTypes.STRING(255),
      validate: {
        len: {
          args: [0, 255],
          msg: "Verification code cannot exceed 255 characters",
        },
      },
    },
    created_at: {
      type: DataTypes.DATE,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Customer;
