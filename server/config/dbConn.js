const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URI)
      .then(() => console.log("Connected to MongoDB"))
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
