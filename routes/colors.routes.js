const {
  addColor,
  findAllColors,
  findColorById,
  deleteColorById,
  updateColorById,
} = require("../controllers/color.controller");
const admin_police = require("../police_middleware/admin_police");

const router = require("express").Router();

router.post("/create", admin_police, addColor);
router.get("/all", findAllColors);
router.get("/:id", findColorById);
router.delete("/:id", admin_police, deleteColorById);
router.put("/:id", admin_police, updateColorById);

module.exports = router;
