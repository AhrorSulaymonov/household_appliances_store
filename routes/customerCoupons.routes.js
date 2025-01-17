const {
  addCustomerCoupon,
  findAllCustomerCoupons,
  findCustomerCouponById,
  deleteCustomerCouponById,
  updateCustomerCouponById,
} = require("../controllers/customerCoupon.controller");
const admin_police = require("../police_middleware/admin_police");

const router = require("express").Router();

router.post("/create", admin_police, addCustomerCoupon);
router.get("/all", findAllCustomerCoupons);
router.get("/:id", findCustomerCouponById);
router.delete("/:id", admin_police, deleteCustomerCouponById);
router.put("/:id", admin_police, updateCustomerCouponById);

module.exports = router;
