const {
  addContractItem,
  findAllContractItems,
  findContractItemById,
  deleteContractItemById,
  updateContractItemById,
} = require("../controllers/contractItem.controller");
const admin_police = require("../police_middleware/admin_police");

const router = require("express").Router();

router.post("/create", admin_police, addContractItem);
router.get("/all", findAllContractItems);
router.get("/:id", findContractItemById);
router.delete("/:id", admin_police, deleteContractItemById);
router.put("/:id", admin_police, updateContractItemById);

module.exports = router;
