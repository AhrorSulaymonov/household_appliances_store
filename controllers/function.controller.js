const { errorHandler } = require("../helpers/error_handler");
const Customer = require("../models/customers");
const Contract = require("../models/contracts");
const Payment = require("../models/payments");
const ContractItem = require("../models/contract_items");
const { Op } = require("sequelize");
const Product = require("../models/products");
const sequelize = require("../config/db");
const Cart = require("../models/carts");

const findSalesReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const contracts = await Contract.findAll({
      where: {
        start_date: {
          [Op.gt]: startDate, // start_date > startDate
          [Op.lt]: endDate, // start_date < endDate
        },
      },
    });
    if (!contracts) {
      return res.status(404).send("bu sanada contract tuzilmagan");
    }
    res.send(contracts);
  } catch (error) {
    errorHandler(error, res);
  }
  res.status(200).send({ metadata });
};

const getOverduePayments = async (req, res) => {
  try {
    const today = new Date();

    const overduePayments = await Payment.findAll({
      where: {
        payment_date: {
          [Symbol.for("lt")]: today,
        },
        amount: {
          [Symbol.for("gt")]: 0,
        },
        paymentStatusId: 1,
      },
    });

    if (!overduePayments) {
      return res.status(404).send({ msg: "Kechikkan to'lovlar topilmadi" });
    }
    const overduePaymentsWithInfo = [];
    for (let i = 0; i < overduePayments.length; i++) {
      const overduePayment = overduePayments[i];
      const amount = overduePayment.amount;
      const contractId = overduePayment.contractId;
      const contract = await Contract.findByPk(contractId);
      const customerId = contract.customerId;
      const customer = await Customer.findByPk(customerId);
      const contractItems = await ContractItem.findAll({
        where: { contractId },
      });

      const info = {};
      if (customer) {
        info.customer = customer;
      }
      if (contract) {
        info.contract = contract;
      }
      if (contractItems) {
        info.contractItems = contractItems;
      }

      overduePaymentsWithInfo.push({
        overduePayment,
        customer,
        contract,
        contractItems,
      });
    }
    res.send(JSON.stringify({ overduePaymentsWithInfo }));
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports = {
  findSalesReport,
  getOverduePayments,
};
