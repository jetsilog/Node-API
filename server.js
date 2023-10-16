require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/productRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
var cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
const FRONTEND = process.env.FRONTEND;

var corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", productRoute);

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/blog", function (req, res) {
  res.send("Hello blog");
});
app.use(errorMiddleware);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
      console.log("Running on port");
    });
  })
  .catch((error) => {
    console.log(error);
  });
