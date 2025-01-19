const {
  addCustomer,
  findAllCustomers,
  findCustomerById,
  deleteCustomerById,
  updateCustomerById,
  activateCustomer,
  loginCustomer,
  logoutCustomer,
  refreshCustomerToken,
} = require("../controllers/customer.controller");
const customer_police = require("../police_middleware/customer_police");
const customer_self_police = require("../police_middleware/customer_self_police");
const update_delete_user = require("../police_middleware/update_delete_user");

const router = require("express").Router();

router.post("/create", addCustomer);
router.get("/all", findAllCustomers);
router.get("/:id", findCustomerById);
router.delete("/:id", update_delete_user, deleteCustomerById);
router.put("/:id", update_delete_user, updateCustomerById);

router.get("/activate/:link", activateCustomer);
router.post("/login", loginCustomer);
router.post("/logout", logoutCustomer);
router.post("/refresh", refreshCustomerToken);

module.exports = router;
