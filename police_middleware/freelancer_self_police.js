module.exports = async function (req, res, next) {
  try {
    const id = req.params.id;
    console.log("req.params.id", req.params.id);

    console.log("req.freelance", req.freelance);

    if (+id !== +req.freelance.id) {
      return res.status(403).send({ message: "Sizda bunday huquq yo'q" });
    }

    next();
  } catch (error) {
    return res
      .status(403)
      .send({ message: "freelance self police" + error.message });
  }
};
