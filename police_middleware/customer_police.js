const { to } = require("../helpers/to_promise");
const customerJwt = require("../services/customerJwt");
const logger = require("../services/logger.service");

module.exports = async function (req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res
        .status(403)
        .send({ message: "Customer ro'yxatdan o'tmagan (token topilmadi)" });
    }

    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];

    if (bearer !== "Bearer" || !token) {
      return res
        .status(403)
        .send({ message: "Customer ro'yxatdan o'tmagan (token topilmadi)" });
    }

    const [error, decodedToken] = await to(
      customerJwt.verifyaccessToken(token)
    );

    if (error) {
      logger.log(error);
      return res.status(403).send({ message: error.message });
    }
    logger.log(decodedToken);
    req.customer = decodedToken;
    next();
  } catch (error) {
    return res.status(403).send({ message: error.message });
  }
};
