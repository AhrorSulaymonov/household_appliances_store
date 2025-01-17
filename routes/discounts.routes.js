const {
  addDiscount,
  findAllDiscounts,
  findDiscountById,
  deleteDiscountById,
  updateDiscountById,
} = require("../controllers/discount.controller");
const admin_police = require("../police_middleware/admin_police");

const router = require("express").Router();

router.post("/create", admin_police, addDiscount);
router.get("/all", findAllDiscounts);
router.get("/:id", findDiscountById);
router.delete("/:id", admin_police, deleteDiscountById);
router.put("/:id", admin_police, updateDiscountById);

module.exports = router;
