const {
  addAdmin,
  findAllAdmins,
  findAdminById,
  deleteAdminById,
  updateAdminById,
  activateAdmin,
  loginAdmin,
  logoutAdmin,
  refreshAdminToken,
} = require("../controllers/admin.controller");
const admin_police = require("../police_middleware/admin_police");
const admin_self_police = require("../police_middleware/admin_self_police");
const creator_police = require("../police_middleware/creator_police");

const router = require("express").Router();

router.post("/create", creator_police, addAdmin);
router.get("/all", admin_police, findAllAdmins);
router.get("/:id", admin_police, findAdminById);
router.delete("/:id", creator_police, deleteAdminById);
router.put("/:id", admin_police, admin_self_police, updateAdminById);

router.get("/activate/:link", activateAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.post("/refresh", refreshAdminToken);

module.exports = router;
