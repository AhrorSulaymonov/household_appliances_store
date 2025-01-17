const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Customer = require("./customers");
const Product = require("./products");

const Feedback = sequelize.define(
  "feedback",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Rating cannot be null",
        },
        isDecimal: {
          msg: "Rating must be a valid decimal number",
        },
        min: {
          args: [1],
          msg: "Rating must be greater than or equal to 1",
        },
        max: {
          args: [5],
          msg: "Rating must be less than or equal to 5",
        },
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Comment cannot be null",
        },
        notEmpty: {
          msg: "Comment cannot be empty",
        },
        len: {
          args: [10, 500],
          msg: "Comment must be between 10 and 500 characters",
        },
      },
    },
  },
  {
    freezeTableName: true,
  }
);

// Relationships with foreignKey names
Customer.belongsToMany(Product, {
  through: Feedback,
});
Product.belongsToMany(Customer, {
  through: Feedback,
});

Customer.hasMany(Feedback, { onDelete: "CASCADE" });
Feedback.belongsTo(Customer, {
  onDelete: "CASCADE",
});

Product.hasMany(Feedback, { onDelete: "CASCADE" });
Feedback.belongsTo(Product, { onDelete: "CASCADE" });

module.exports = Feedback;
