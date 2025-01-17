const { to } = require("../helpers/to_promise");
const customerJwt = require("../services/customerJwt");
module.exports = async function (req, res, next) {
  try {
    const id = req.params.id;
    if (+id !== +req.customer.id) {
      return res.status(403).send({ message: "Sizda bunday huquq yo'q" });
    }

    next();
  } catch (error) {
    return res.status(403).send({ message: error.message });
  }
};
