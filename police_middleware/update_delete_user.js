const { to } = require("../helpers/to_promise");
const customerJwt = require("../services/customerJwt");
const adminJwt = require("../services/adminJwt");

module.exports = async function (req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res
        .status(403)
        .send({ message: "Stranger ro'yxatdan o'tmagan (token topilmadi)" });
    }

    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];

    if (bearer !== "Bearer" || !token) {
      return res
        .status(403)
        .send({ message: "Stranger ro'yxatdan o'tmagan (token topilmadi)" });
    }

    const [error, decodedToken] = await to(
      customerJwt.verifyaccessToken(token)
    );

    if (error) {
      const [error, decodedToken] = await to(adminJwt.verifyaccessToken(token));
      if (error) {
        console.log(error);
        return res.status(403).send({ message: error.message });
      }
      if (decodedToken) {
        return next();
      }
    }
    if (req.id != decodedToken.id) {
      return res.status(403).send({
        message: "siz boshqa userni ma'lumotlarini o'zgartiraolmaysiz",
      });
    }
    console.log(decodedToken);

    next();
  } catch (error) {
    return res.status(403).send({ message: error.message });
  }
};
