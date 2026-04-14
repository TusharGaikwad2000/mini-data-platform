const express = require("express");
const cors = require("cors");

const uploadRoutes = require("./routes/upload.routes");
const queryRoutes = require("./routes/query.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoutes);
app.use("/api/query", queryRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));