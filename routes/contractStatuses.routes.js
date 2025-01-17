const {
  addContractStatus,
  findAllContractStatuses,
  findContractStatusById,
  deleteContractStatusById,
  updateContractStatusById,
} = require("../controllers/contractStatus.controller");
const admin_police = require("../police_middleware/admin_police");

const router = require("express").Router();

router.post("/create", admin_police, addContractStatus);
router.get("/all", findAllContractStatuses);
router.get("/:id", findContractStatusById);
router.delete("/:id", admin_police, deleteContractStatusById);
router.put("/:id", admin_police, updateContractStatusById);

module.exports = router;
