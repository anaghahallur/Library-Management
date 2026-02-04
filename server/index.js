import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js'; // ✅ Import user routes

dotenv.config(); // Load .env variables

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Debug: Log incoming requests
app.use((req, res, next) => {
  console.log(`👉 [${req.method}] ${req.url}`);
  console.log("📦 Request body:", req.body);
  next();
});

// Route handlers
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes); // ✅ Register user routes

// MongoDB Connection
const connect = async () => {
  try {
    if (!process.env.MONGO) {
      console.error("❌ MONGO environment variable not set");
      return;
    }
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
};

// Start Server
const PORT = 8800;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  connect();
});