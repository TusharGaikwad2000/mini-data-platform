const express = require("express");
const cors = require("cors");

const uploadRoutes = require("./routes/upload.routes");
const queryRoutes = require("./routes/query.routes");
const datasetRoutes = require("./routes/dataset.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoutes);
app.use("/api/query", queryRoutes);
app.use("/api/datasets", datasetRoutes);

// Automatic DB Sync Logic
const sequelize = require("../config/db");
require("../models"); // Load the models
sequelize.sync({ alter: true }).then(() => console.log("Database synced automatically!"));

app.listen(5000, () => console.log("Server running on port 5000"));