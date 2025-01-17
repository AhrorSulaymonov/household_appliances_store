const {
  addCartItem,
  findAllCartItems,
  findCartItemById,
  deleteCartItemById,
  updateCartItemById,
} = require("../controllers/cartItem.controller");

const router = require("express").Router();

router.post("/create", addCartItem);
router.get("/all", findAllCartItems);
router.get("/:id", findCartItemById);
router.delete("/:id", deleteCartItemById);
router.put("/:id", updateCartItemById);

module.exports = router;
