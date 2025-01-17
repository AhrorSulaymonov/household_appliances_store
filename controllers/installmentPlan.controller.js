const { errorHandler } = require("../helpers/error_handler");
const InstallmentPlan = require("../models/installment_plans");
const {
  installmentPlanValidation,
} = require("../validations/installmentPlan.validation");

const addInstallmentPlan = async (req, res) => {
  try {
    const { error, value } = installmentPlanValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    
    const newInstallmentPlan = await InstallmentPlan.create(value);
    res.status(201).send({ newInstallmentPlan });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllInstallmentPlans = async (req, res) => {
  try {
    const installmentPlans = await InstallmentPlan.findAll();
    res.status(200).send({ installmentPlans });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findInstallmentPlanById = async (req, res) => {
  try {
    const id = req.params.id;
    const installmentPlan = await InstallmentPlan.findOne({ where: { id } });
    res.status(200).send({ installmentPlan });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateInstallmentPlanById = async (req, res) => {
  try {
    const { error, value } = installmentPlanValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const id = req.params.id;
    const installmentPlan = await InstallmentPlan.update(value, {
      where: { id },
      returning: true,
    });
    res.status(200).send({ installmentPlan: installmentPlan[1] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteInstallmentPlanById = async (req, res) => {
  try {
    const id = req.params.id;
    const installmentPlan = await InstallmentPlan.destroy({ where: { id } });
    res.status(200).send({ deleted: !!installmentPlan });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addInstallmentPlan,
  findAllInstallmentPlans,
  findInstallmentPlanById,
  updateInstallmentPlanById,
  deleteInstallmentPlanById,
};
