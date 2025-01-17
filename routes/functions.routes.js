const {
  findSalesReport,
  getOverduePayments,
} = require("../controllers/function.controller");
const admin_police = require("../police_middleware/admin_police");

const router = require("express").Router();

router.get("/getNoPaidall", admin_police, getOverduePayments);
router.post("/getcoldproducts", admin_police, findSalesReport);
module.exports = router;
