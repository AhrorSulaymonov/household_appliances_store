const { where } = require("sequelize");
const { errorHandler } = require("../helpers/error_handler");
const CartItem = require("../models/cart_items");
const Cart = require("../models/carts");
const Contract = require("../models/contracts");
const Coupon = require("../models/coupons");
const Product = require("../models/products");
const { contractValidation } = require("../validations/contract.validation");
const Discount = require("../models/discounts");
const { to } = require("../helpers/to_promise");
const ProductDiscount = require("../models/product_discounts");
const CustomerCoupon = require("../models/customer_coupons");
const InstallmentPlan = require("../models/installment_plans");
const Payment = require("../models/payments");
const ContractItem = require("../models/contract_items");

const addContract = async (req, res) => {
  try {
    const { error, value } = contractValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const cart = await Cart.findOne({
      where: { customerId: value.customerId },
    });
    const customerId = value.customerId;
    console.log("1", cart.dataValues);
    const cartId = cart.id;
    console.log(cartId);

    const cartItem = await CartItem.findAll({ where: { cartId: cartId } });
    console.log("2", cartItem);

    let total_amount = 0;

    for (let item of cartItem) {
      const quantity = item.quantity;
      const productId = item.productId;
      const product = await Product.findByPk(productId);
      product.stock = product.stock - quantity;
      product.save();
      console.log("product", product.dataValues);
      let price = product.price;
      const productDiscount = await ProductDiscount.findOne({
        where: { productId },
      });

      if (productDiscount) {
        const discountId = productDiscount.discountId;
        if (discountId) {
          const discount = await Discount.findByPk(productDiscount.discountId);
          const discount_type = discount.discount_type;
          const discount_value = discount.discount_value;
          if (discount_type == "percent") {
            price -= price * (discount_value / 100);
          } else {
            price -= discount_value;
          }
        }
      }

      total_amount += quantity * price;

      console.log(
        "quantity",
        quantity,
        "productId",
        productId,
        "total_amout",
        total_amount
      );
    }
    const hozirgiVaqt = new Date();
    // PostgreSQL uchun formatlash: YYYY-MM-DD HH:mm:ss
    const yil = hozirgiVaqt.getFullYear();
    const oy = String(hozirgiVaqt.getMonth() + 1).padStart(2, "0"); // Oy 0 dan boshlanadi, shuning uchun 1 qo'shamiz
    const kun = String(hozirgiVaqt.getDate()).padStart(2, "0");
    // PostgreSQL formatidagi string
    const today = `${yil}-${oy}-${kun}`;
    if (value.coupon_code) {
      const coupon = await Coupon.findOne({
        where: { code: value.coupon_code },
      });
      console.log("3", coupon.dataValues);
      const couponId = coupon.id;
      const customerCoupon = await CustomerCoupon.findOne({
        where: { couponId, customerId },
      });
      console.log("customerCoupon", customerCoupon);
      console.log("customerCoupon", customerCoupon.is_used);

      if (customerCoupon) {
        console.log(customerCoupon);

        if (customerCoupon.is_used == false) {
          const discount_value = coupon.discount_value;
          const discount_type = coupon.discount_type;
          if (discount_type == "percent") {
            total_amount -= total_amount * (discount_value / 100);
          } else {
            total_amount -= discount_value;
          }

          customerCoupon.is_used = true;
          customerCoupon.used_date = today;
          customerCoupon.save();
        } else {
          return res
            .status(400)
            .send({ message: "siz bu coupondan foydalangansiz" });
        }
      }
    }

    console.log("total_amount", total_amount);

    const instalmentPlan = await InstallmentPlan.findByPk(
      value.installmentPlanId
    );

    const interest_rate = instalmentPlan.interest_rate;
    const duration_months = instalmentPlan.duration_months;
    total_amount += total_amount * interest_rate;

    const down_payment = total_amount / 10;

    const newContract = await Contract.create({
      ...value,
      start_date: today,
      down_payment,
      total_amount,
    });

    for (let item of cartItem) {
      const quantity = item.quantity;
      const productId = item.productId;
      await ContractItem.create({
        productId,
        contractId: newContract.id,
        quantity,
      });
    }
    try {
      const deletedCount = await CartItem.destroy({
        where: {
          cartId: cartId, // cartId sharti
        },
      });
      console.log(`${deletedCount} yozuv o'chirildi.`);
    } catch (error) {
      console.error("O'chirishda xatolik:", error);
    }
    let counter = 0;
    const amount = (total_amount - down_payment) / duration_months;
    const payment_date = value.payment_date;
    for (let i = 0; i < duration_months; i++) {
      counter++;
      const tolovoy = String(hozirgiVaqt.getMonth() + 1 + counter + 1).padStart(
        2,
        "0"
      );
      const tolovkun = `${yil}-${tolovoy}-${payment_date}`;

      await Payment.create({
        contractId: newContract.id,
        payment_date: tolovkun,
        amount,
        paymentStatusId: 1,
      });
    }

    res.status(201).send({ newContract });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.findAll();
    res.status(200).send({ contracts });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findContractById = async (req, res) => {
  try {
    const id = req.params.id;
    const contract = await Contract.findOne({ where: { id } });
    res.status(200).send({ contract });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateContractById = async (req, res) => {
  try {
    const { error, value } = contractValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const id = req.params.id;
    const contract = await Contract.update(value, {
      where: { id },
      returning: true,
    });
    res.status(200).send({ contract: contract[1] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteContractById = async (req, res) => {
  try {
    const id = req.params.id;
    const contract = await Contract.destroy({ where: { id } });
    res.status(200).send({ deleted: !!contract });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addContract,
  findAllContracts,
  findContractById,
  updateContractById,
  deleteContractById,
};
