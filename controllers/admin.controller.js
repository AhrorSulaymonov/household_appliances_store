const { errorHandler } = require("../helpers/error_handler");
const Admin = require("../models/admins");
const { adminValidation } = require("../validations/admin.validation");
const bcrypt = require("bcrypt");
const adminJwt = require("../services/adminJwt");
const { to } = require("../helpers/to_promise");
const config = require("config");
const uuid = require("uuid");
const mailService = require("../services/mail.service");

const addAdmin = async (req, res) => {
  try {
    const { error, value } = adminValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const oldAdmin = await Admin.findOne({ where: { email: value.email } });
    if (oldAdmin) {
      return res.status(400).send({ message: "This admin already exists" });
    }

    const hashedPassword = bcrypt.hashSync(value.password, 7);
    const activation_link = uuid.v4();

    const newAdmin = await Admin.create({
      ...value,
      password: hashedPassword,
      verification: activation_link,
    });

    await mailService.sendMailActivationCode(
      value.email,
      `${config.get("api_url")}/api/admins/activate/${activation_link}`
    );

    res.status(201).send({ message: "New admin added", newAdmin });
  } catch (error) {
    errorHandler(error, res);
  }
};

const activateAdmin = async (req, res) => {
  try {
    const link = req.params.link;
    const admin = await Admin.findOne({
      where: { verification: link },
    });
    if (!admin) {
      return res.status(400).send({ message: "Bunday admin topilmadi" });
    }
    if (admin.is_active) {
      return res.status(400).send({ message: "Admin oldin faollashtirilgan" });
    }
    admin.is_active = true;
    await admin.save();
    res.send({
      message: "Admin faollashtirildi",
      is_active: admin.is_active,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(401).send({ message: "Email yoki parol noto'g'ri" });
    }
    const validPassword = bcrypt.compareSync(password, admin.password);
    if (!validPassword) {
      return res.status(401).send({ message: "Email yoki parol noto'g'ri" });
    }

    const payload = {
      id: admin._id,
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const tokens = adminJwt.generateTokens(payload);
    admin.refresh_token = tokens.refreshToken;
    await admin.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_token_ms"),
    });

    res.status(200).send({
      message: "Tizimga xush kelibsiz",
      admin_id: admin._id,
      admin_accessToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const logoutAdmin = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    console.log(req.cookies);

    console.log("refreshToken", refreshToken);

    if (!refreshToken) {
      return res.status(400).send({ message: "token topilmadi" });
    }
    const admin = await Admin.findOne({
      where: { refresh_token: refreshToken },
    });

    if (admin) {
      admin.refresh_token = ""; // refresh_token-ni bo'sh stringga o'zgartirish
      await admin.save(); // O'zgartirishni saqlash
    } else {
      return res.status(400).send({ message: "Bunday tokenli admin yo'q" });
    }
    res.clearCookie("refreshToken");
    res.send({ refreshToken: admin.refresh_token });
  } catch (error) {
    errorHandler(error, res);
  }
};

const refreshAdminToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(400).send({ message: "token topilmadi" });
    }
    const [error, tokenFromCookie] = await to(
      adminJwt.verifyRefreshToken(refreshToken)
    );
    if (error) {
      return res.status(401).send({ error: error.message });
    }
    const admin = await Admin.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!admin) {
      return res.status(404).send({ message: "Admin not found" });
    }

    const payload = {
      id: admin.id,
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const tokens = adminJwt.generateTokens(payload);
    admin.refresh_token = tokens.refreshToken;
    await admin.save();
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

const findAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).send({ admins });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admin.findOne({ where: { id } });
    if (!admin) return res.status(404).send({ message: "Admin not found" });
    res.status(200).send({ admin });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateAdminById = async (req, res) => {
  try {
    const { error, value } = adminValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const id = req.params.id;
    const hashedPassword = bcrypt.hashSync(value.password, 7);

    const admin = await Admin.update(
      { ...value, password: hashedPassword },
      { where: { id }, returning: true }
    );
    if (admin[1].length === 0)
      return res.status(404).send({ message: "Admin not found" });
    res.status(200).send({ admin: admin[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Admin.destroy({ where: { id } });
    if (!deleted) return res.status(404).send({ message: "Admin not found" });
    res.status(200).send({ deleted: true });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addAdmin,
  findAllAdmins,
  findAdminById,
  updateAdminById,
  deleteAdminById,
  activateAdmin,
  loginAdmin,
  logoutAdmin,
  refreshAdminToken,
};
