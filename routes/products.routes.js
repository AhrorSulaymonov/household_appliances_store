const {
  addProduct,
  findAllProducts,
  findProductById,
  deleteProductById,
  updateProductById,
} = require("../controllers/product.controller");
const admin_police = require("../police_middleware/admin_police");

const router = require("express").Router();

router.post("/create", admin_police, addProduct);
router.get("/all", findAllProducts);
router.get("/:id", findProductById);
router.delete("/:id", admin_police, deleteProductById);
router.put("/:id", admin_police, updateProductById);

module.exports = router;
