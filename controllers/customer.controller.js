const { errorHandler } = require("../helpers/error_handler");
const Customer = require("../models/customers");
const bcrypt = require("bcrypt");
const { customerValidation } = require("../validations/customer.validation");
const customerJwt = require("../services/customerJwt");
const { to } = require("../helpers/to_promise");
const config = require("config");
const uuid = require("uuid");
const mailService = require("../services/mail.service");
const CustomerCoupon = require("../models/customer_coupons");
const Cart = require("../models/carts");
const Contract = require("../models/contracts");
const Payment = require("../models/payments");
const CartItem = require("../models/cart_items");
const ContractItem = require("../models/contract_items");
const { Op } = require("sequelize");

const addCustomer = async (req, res) => {
  try {
    const { error, value } = customerValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const oldCustomer = await Customer.findOne({
      where: { email: value.email },
    });
    if (oldCustomer) {
      return res.status(400).send({ message: "This customer already exists" });
    }

    const hashedPassword = bcrypt.hashSync(value.password, 7);
    const activation_link = uuid.v4();

    const newCustomer = await Customer.create({
      ...value,
      password: hashedPassword,
      verification: activation_link,
    });

    await mailService.sendMailActivationCode(
      value.email,
      `${config.get("api_url")}/api/customers/activate/${activation_link}`
    );

    res.status(201).send({ message: "New customer added", newCustomer });
  } catch (error) {
    errorHandler(error, res);
  }
};

const activateCustomer = async (req, res) => {
  try {
    const link = req.params.link;
    const customer = await Customer.findOne({
      where: { verification: link },
    });
    if (!customer) {
      return res.status(400).send({ message: "Bunday customer topilmadi" });
    }
    if (customer.is_active) {
      return res
        .status(400)
        .send({ message: "Customer oldin faollashtirilgan" });
    }
    customer.is_active = true;
    await customer.save();

    const hozirgiVaqt = new Date();

    // PostgreSQL uchun formatlash: YYYY-MM-DD HH:mm:ss
    const yil = hozirgiVaqt.getFullYear();
    const oy = String(hozirgiVaqt.getMonth() + 1).padStart(2, "0"); // Oy 0 dan boshlanadi, shuning uchun 1 qo'shamiz
    const kun = String(hozirgiVaqt.getDate()).padStart(2, "0");
    // PostgreSQL formatidagi string
    const issued_date = `${yil}-${oy}-${kun}`;

    await CustomerCoupon.create({
      customerId: customer.id,
      couponId: 1,
      issued_date: issued_date,
    });

    await Cart.create({
      customerId: customer.id,
    });

    res.send({
      message: "Customer faollashtirildi",
      is_active: customer.is_active,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ where: { email } });
    if (!customer) {
      return res.status(401).send({ message: "Email yoki parol noto'g'ri" });
    }
    const validPassword = bcrypt.compareSync(password, customer.password);
    if (!validPassword) {
      return res.status(401).send({ message: "Email yoki parol noto'g'ri" });
    }

    const payload = {
      id: customer._id,
      email: customer.email,
      is_active: customer.is_active,
    };

    const tokens = customerJwt.generateTokens(payload);
    customer.refresh_token = tokens.refreshToken;
    await customer.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_token_ms"),
    });

    res.status(200).send({
      message: "Tizimga xush kelibsiz",
      customer_id: customer._id,
      customer_accessToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const logoutCustomer = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    console.log(req.cookies);

    console.log("refreshToken", refreshToken);

    if (!refreshToken) {
      return res.status(400).send({ message: "token topilmadi" });
    }
    const customer = await Customer.findOne({
      where: { refresh_token: refreshToken },
    });

    if (customer) {
      customer.refresh_token = ""; // refresh_token-ni bo'sh stringga o'zgartirish
      await customer.save(); // O'zgartirishni saqlash
    } else {
      return res.status(400).send({ message: "Bunday tokenli customer yo'q" });
    }
    res.clearCookie("refreshToken");
    res.send({ refreshToken: customer.refresh_token });
  } catch (error) {
    errorHandler(error, res);
  }
};

const refreshCustomerToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(400).send({ message: "token topilmadi" });
    }
    const [error, tokenFromCookie] = await to(
      customerJwt.verifyRefreshToken(refreshToken)
    );
    if (error) {
      return res.status(401).send({ error: error.message });
    }
    const customer = await Customer.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!customer) {
      return res.status(404).send({ message: "Customer not found" });
    }

    const payload = {
      id: customer.id,
      email: customer.email,
      is_active: customer.is_active,
    };

    const tokens = customerJwt.generateTokens(payload);
    customer.refresh_token = tokens.refreshToken;
    await customer.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_token_ms"),
    });

    res.status(200).send({
      message: "Tizimga xush kelibsiz",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll({
      include: {
        model: Contract,
        include: [
          {
            model: Payment,
          },
          {
            model: ContractItem,
          },
        ],
      },
    });
    res.status(200).send({ customers });
  } catch (error) {
    errorHandler(error, res);
  }
};


const findCustomerById = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findOne({
      where: { id },
      include: {
        model: Contract,
        include: [
          {
            model: Payment,
            where: {
              payment_date: {
                [Op.gt]: new Date(), // Bugungi kundan keyingi sanalar
              },
              paymentStatusId: 1, // Statusi 1 bo'lgan yozuvlar
            },
          },
          {
            model: ContractItem,
          },
        ],
      },
    });
    if (!customer)
      return res.status(404).send({ message: "Customer not found" });
    res.status(200).send({ customer });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateCustomerById = async (req, res) => {
  try {
    const { error, value } = customerValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const id = req.params.id;
    const hashedPassword = bcrypt.hashSync(value.password, 7);

    const customer = await Customer.update(
      { ...value, password: hashedPassword },
      { where: { id }, returning: true }
    );
    if (customer[1].length === 0)
      return res.status(404).send({ message: "Customer not found" });
    res.status(200).send({ customer: customer[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteCustomerById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Customer.destroy({ where: { id } });
    if (!deleted)
      return res.status(404).send({ message: "Customer not found" });
    res.status(200).send({ deleted: true });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addCustomer,
  findAllCustomers,
  findCustomerById,
  updateCustomerById,
  deleteCustomerById,
  activateCustomer,
  loginCustomer,
  logoutCustomer,
  refreshCustomerToken,
};
