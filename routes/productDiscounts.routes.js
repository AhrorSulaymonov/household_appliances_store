const {
  addProductDiscount,
  findAllProductDiscounts,
  findProductDiscountById,
  deleteProductDiscountById,
  updateProductDiscountById,
} = require("../controllers/productDiscount.controller");
const admin_police = require("../police_middleware/admin_police");

const router = require("express").Router();

router.post("/create", admin_police, addProductDiscount);
router.get("/all", findAllProductDiscounts);
router.get("/:id", findProductDiscountById);
router.delete("/:id", admin_police, deleteProductDiscountById);
router.put("/:id", admin_police, updateProductDiscountById);

module.exports = router;
