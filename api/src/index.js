require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("./mysqlDb");
const { PORT } = require("./config");
const app = express();
const allowedOrigins = ["http://localhost:5173"];

app.use(helmet());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

app.use("/api/user", require("./controllers/user"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
