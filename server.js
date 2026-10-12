const express = require("express");
// const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const dns = require("dns");
 
dns.setServers([
    "8.8.8.8",
    "1.1.1.1"
]);
 
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
 
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log("MongoDB Connection Error:", error.message);
    }
};
 
module.exports = connectDB;

dotenv.config();

const authRoutes = require("./Routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Routes
app.use("/api/auth", authRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });