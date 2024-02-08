const express = require("express");
const cors = require("cors");
require("dotenv").config();
const indexRoutes = require("./routes/index.routes");
const connectDB = require("./config/dbConn");
const sanitize = require("sanitize");

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};
const port = process.env.PORT;

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(sanitize.middleware);
app.use(indexRoutes);

connectDB();

app.listen(port, () =>
  console.log(`Server running on: ${process.env.BACKEND_URL}:${port}`)
);
