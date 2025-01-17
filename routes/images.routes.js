const {
  addImage,
  findAllImages,
  findImageById,
  deleteImageById,
  updateImageById,
} = require("../controllers/image.controller");
const admin_police = require("../police_middleware/admin_police");

const router = require("express").Router();

router.post("/create", admin_police, addImage);
router.get("/all", findAllImages);
router.get("/:id", findImageById);
router.delete("/:id", admin_police, deleteImageById);
router.put("/:id", admin_police, updateImageById);

module.exports = router;
