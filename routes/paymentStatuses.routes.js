const {
  addPaymentStatus,
  findAllPaymentStatuses,
  findPaymentStatusById,
  deletePaymentStatusById,
  updatePaymentStatusById,
} = require("../controllers/paymentStatus.controller");
const admin_police = require("../police_middleware/admin_police");

const router = require("express").Router();

router.post("/create", admin_police, addPaymentStatus);
router.get("/all", findAllPaymentStatuses);
router.get("/:id", findPaymentStatusById);
router.delete("/:id", admin_police, deletePaymentStatusById);
router.put("/:id", admin_police, updatePaymentStatusById);

module.exports = router;
