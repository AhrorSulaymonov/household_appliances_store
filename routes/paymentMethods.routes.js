const {
  addPaymentMethod,
  findAllPaymentMethods,
  findPaymentMethodById,
  deletePaymentMethodById,
  updatePaymentMethodById,
} = require("../controllers/paymentMethod.controller");
const admin_police = require("../police_middleware/admin_police");

const router = require("express").Router();

router.post("/create", admin_police, addPaymentMethod);
router.get("/all", findAllPaymentMethods);
router.get("/:id", findPaymentMethodById);
router.delete("/:id", admin_police, deletePaymentMethodById);
router.put("/:id", admin_police, updatePaymentMethodById);

module.exports = router;
