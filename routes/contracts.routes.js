const {
  addContract,
  findAllContracts,
  findContractById,
  deleteContractById,
  updateContractById,
} = require("../controllers/contract.controller");
const admin_police = require("../police_middleware/admin_police");

const router = require("express").Router();

router.post("/create", admin_police, addContract);
router.get("/all", findAllContracts);
router.get("/:id", findContractById);
router.delete("/:id", admin_police, deleteContractById);
router.put("/:id", admin_police, updateContractById);

module.exports = router;
