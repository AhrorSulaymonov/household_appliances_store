const { errorHandler } = require("../helpers/error_handler");
const ContractStatus = require("../models/contract_statuses");
const {
  contractStatusValidation,
} = require("../validations/contractStatus.validation");

const addContractStatus = async (req, res) => {
  try {
    const { error, value } = contractStatusValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const newContractStatus = await ContractStatus.create(value);
    res.status(201).send({ newContractStatus });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllContractStatuses = async (req, res) => {
  try {
    const contractStatuses = await ContractStatus.findAll();
    res.status(200).send({ contractStatuses });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findContractStatusById = async (req, res) => {
  try {
    const id = req.params.id;
    const contractStatus = await ContractStatus.findOne({ where: { id } });
    res.status(200).send({ contractStatus });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateContractStatusById = async (req, res) => {
  try {
    const { error, value } = contractStatusValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const id = req.params.id;
    const contractStatus = await ContractStatus.update(value, {
      where: { id },
      returning: true,
    });
    res.status(200).send({ contractStatus: contractStatus[1] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteContractStatusById = async (req, res) => {
  try {
    const id = req.params.id;
    const contractStatus = await ContractStatus.destroy({ where: { id } });
    res.status(200).send({ deleted: !!contractStatus });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addContractStatus,
  findAllContractStatuses,
  findContractStatusById,
  updateContractStatusById,
  deleteContractStatusById,
};
