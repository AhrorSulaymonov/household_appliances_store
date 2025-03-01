const express = require("express");
const config = require("config");
const sequelize = require("./config/db");
const cookieParser = require("cookie-parser");
const mainRouter = require("./routes/index.routes");
const PORT = config.get("port");
const logger = require("./services/logger.service");
const { requestLogging, errorLogging } = require("./helpers/express_winston");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(requestLogging);
app.use("/api", mainRouter);
app.use(errorLogging);
async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
