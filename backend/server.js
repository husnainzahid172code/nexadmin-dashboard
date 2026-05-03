const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI;

if (mongoUri) {
  mongoose.connect(mongoUri)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB error:", err));
} else {
  console.warn("MONGO_URI is not set; starting without a database connection.");
}

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => res.json({ message: "NexAdmin API running" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
