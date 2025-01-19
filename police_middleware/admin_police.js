const { to } = require("../helpers/to_promise");
const adminJwt = require("../services/adminJwt");
const logger = require("../services/logger.service");

module.exports = async function (req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res
        .status(403)
        .send({ message: "Admin ro'yxatdan o'tmagan (token topilmadi)" });
    }

    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];

    if (bearer !== "Bearer" || !token) {
      return res
        .status(403)
        .send({ message: "Admin ro'yxatdan o'tmagan (token topilmadi)" });
    }

    // if (!decodedToken.is_active) {
    //   return res
    //     .status(403)
    //     .send({ message: "Admin activelashtirilmagan" });
    // }

    const [error, decodedToken] = await to(adminJwt.verifyaccessToken(token));

    if (error) {
      logger.log(error);
      return res.status(403).send({ message: error.message });
    }
    logger.log("decoded token", decodedToken);
    req.admin = decodedToken;
    next();
  } catch (error) {
    return res.status(403).send({ message: "admin_police" + error.message });
  }
};
