const {
  addCoupon,
  findAllCoupons,
  findCouponById,
  deleteCouponById,
  updateCouponById,
} = require("../controllers/coupon.controller");
const admin_police = require("../police_middleware/admin_police");

const router = require("express").Router();

router.post("/create", admin_police, addCoupon);
router.get("/all", findAllCoupons);
router.get("/:id", findCouponById);
router.delete("/:id", admin_police, deleteCouponById);
router.put("/:id", admin_police, updateCouponById);

module.exports = router;
