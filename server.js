const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const eventRoutes = require("./routes/events");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/eventDB");

mongoose.connection.once("open", () => {
  console.log("✅ Connected to MongoDB: eventDB");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

// ✅ Root route for browser check
app.get("/", (req, res) => {
  res.send("🎉 Event Backend is Running!");
});

// API routes
app.use("/api/events", eventRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
