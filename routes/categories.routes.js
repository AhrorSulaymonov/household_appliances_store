const {
  addCategory,
  findAllCategories,
  findCategoryById,
  deleteCategoryById,
  updateCategoryById,
} = require("../controllers/category.controller");
const admin_police = require("../police_middleware/admin_police");

const router = require("express").Router();

router.post("/create", admin_police, addCategory);
router.get("/all", findAllCategories);
router.get("/:id", findCategoryById);
router.delete("/:id", admin_police, deleteCategoryById);
router.put("/:id", admin_police, updateCategoryById);

module.exports = router;
