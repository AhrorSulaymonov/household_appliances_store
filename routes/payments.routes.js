const {
  addPayment,
  findAllPayments,
  findPaymentById,
  deletePaymentById,
  updatePaymentById,
} = require("../controllers/payment.controller");
const Admin = require("../models/admins");
const admin_police = require("../police_middleware/admin_police");

const router = require("express").Router();

router.post("/create", admin_police, addPayment);
router.get("/all", findAllPayments);
router.get("/:id", findPaymentById);
router.delete("/:id", admin_police, deletePaymentById);
router.put("/:id", admin_police, updatePaymentById);

module.exports = router;
