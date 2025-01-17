const {
  addBrand,
  findAllBrands,
  findBrandById,
  deleteBrandById,
  updateBrandById,
} = require("../controllers/brand.controller");
const admin_police = require("../police_middleware/admin_police");

const router = require("express").Router();

router.post("/create", admin_police, addBrand);
router.get("/all", findAllBrands);
router.get("/:id", findBrandById);
router.delete("/:id", admin_police, deleteBrandById);
router.put("/:id", admin_police, updateBrandById);

module.exports = router;
