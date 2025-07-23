const express = require('express');
const cors = require("cors");   
const mongoose = require('mongoose');
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const { DB_URI, PORT } = process.env;

const app = express();

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
    console.log("server connected in port" + PORT);
})

app.use(
    cors({
      origin: ["http://localhost:4000", "http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

  app.use(cookieParser());

  app.use(express.json());

  app.use("/", authRoute);