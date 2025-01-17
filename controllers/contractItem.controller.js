const { errorHandler } = require("../helpers/error_handler");
const ContractItem = require("../models/contract_items");
const {
  contractItemValidation,
} = require("../validations/contractItem.validation");

const addContractItem = async (req, res) => {
  try {
    const { error, value } = contractItemValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const newContractItem = await ContractItem.create(value);
    res.status(201).send({ newContractItem });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllContractItems = async (req, res) => {
  try {
    const contractItem = await ContractItem.findAll();
    res.status(200).send({ contractItem });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findContractItemById = async (req, res) => {
  try {
    const id = req.params.id;
    const contractItem = await ContractItem.findOne({ where: { id } });
    res.status(200).send({ contractItem });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateContractItemById = async (req, res) => {
  try {
    const { error, value } = contractItemValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const id = req.params.id;
    const contractItem = await ContractItem.update(value, {
      where: { id },
      returning: true,
    });
    res.status(200).send({ contractItem: contractItem[1] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteContractItemById = async (req, res) => {
  try {
    const id = req.params.id;
    const contractItem = await ContractItem.destroy({ where: { id } });
    res.status(200).send({ deleted: !!contractItem });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addContractItem,
  findAllContractItems,
  findContractItemById,
  updateContractItemById,
  deleteContractItemById,
};
