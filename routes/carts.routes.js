const {
  addCart,
  findAllCarts,
  findCartById,
  deleteCartById,
  updateCartById,
} = require("../controllers/cart.controller");
const admin_police = require("../police_middleware/admin_police");

const router = require("express").Router();

router.post("/create", admin_police, addCart);
router.get("/all", findAllCarts);
router.get("/:id", findCartById);
router.delete("/:id", admin_police, deleteCartById);
router.put("/:id", admin_police, updateCartById);

module.exports = router;
