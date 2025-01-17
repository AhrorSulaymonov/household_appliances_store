const {
  addInstallmentPlan,
  findAllInstallmentPlans,
  findInstallmentPlanById,
  deleteInstallmentPlanById,
  updateInstallmentPlanById,
} = require("../controllers/installmentPlan.controller");
const admin_police = require("../police_middleware/admin_police");

const router = require("express").Router();

router.post("/create", admin_police, addInstallmentPlan);
router.get("/all", findAllInstallmentPlans);
router.get("/:id", findInstallmentPlanById);
router.delete("/:id", admin_police, deleteInstallmentPlanById);
router.put("/:id", admin_police, updateInstallmentPlanById);

module.exports = router;
