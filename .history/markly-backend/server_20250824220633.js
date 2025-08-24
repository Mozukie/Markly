import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from "./routes/User.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", User);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
})
.catch(err => console.error("❌ MongoDB error:", err));
