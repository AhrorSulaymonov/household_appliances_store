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

const router = require("express").Router();

router.post("/create", addCustomer);
router.get("/all", findAllCustomers);
router.get("/:id", findCustomerById);
router.delete(
  "/:id",
  customer_police,
  customer_self_police,
  deleteCustomerById
);
router.put("/:id", customer_police, customer_self_police, updateCustomerById);

router.get("/activate/:link", activateCustomer);
router.post("/login", loginCustomer);
router.post("/logout", logoutCustomer);
router.post("/refresh", refreshCustomerToken);

module.exports = router;
