const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASSWORD}@cluster0.3ieir.mongodb.net/${process.env.MONGO_CLUSTER}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const userRoutes = require("./routes/userRoutes");
const planRoutes = require("./routes/planRoutes");
app.use("/api/users", userRoutes);
app.use("/api/plans", planRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
