const {
  addCart,
  findAllCarts,
  findCartById,
  deleteCartById,
  updateCartById,
} = require("../controllers/cart.controller");

const router = require("express").Router();

router.post("/create", addCart);
router.get("/all", findAllCarts);
router.get("/:id", findCartById);
router.delete("/:id", deleteCartById);
router.put("/:id", updateCartById);

module.exports = router;
