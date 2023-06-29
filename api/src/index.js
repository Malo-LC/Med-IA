require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const session = require("express-session");
require("./mysqlDb");
const { PORT } = require("./config");
const app = express();
const allowedOrigins = ["http://localhost:5173"];

app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));

app.use(
  session({
    secret: "your-secret-key", // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
  })
);

app.use(helmet());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json({ limit: "50mb" }));

app.use("/api/user", require("./controllers/user"));
app.use("/api/pneumonia", require("./controllers/pneumonia"));
app.use("/api/analysis", require("./controllers/analysis"));

require("./passport")(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
