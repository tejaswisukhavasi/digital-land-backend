import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import multer from "multer";
import fs from "fs";
import connectDB from "./config/db.js";

// ✅ IMPORT CONTROLLERS
import { registerUser, loginUser } from "./controllers/authController.js";
import { getAllLands, getLandById } from "./controllers/landController.js";
import rentRoutes from "./routes/rentRoutes.js";
import { protect } from "./middleware/authMiddleware.js";

// ✅ IMPORT MODELS
import Land from "./models/Land.js";
import Rent from "./models/Rent.js";

// ✅ IMPORT CLOUDINARY LAND ROUTES
import landRoutes from "./routes/lands.js"; // ✅ added this

dotenv.config();
connectDB();

const app = express();

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Ensure uploads folder exists (keep this in case)
const uploadsDir = path.resolve("uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// ================================
// ✅ AUTH ROUTES
// ================================
app.post("/api/auth/register", registerUser);
app.post("/api/auth/login", loginUser);

// ================================
// ✅ LANDS ROUTES (NOW USE CLOUDINARY)
// ================================
app.use("/api/lands", landRoutes); // ✅ replaces manual upload/post route

// ✅ SEARCH LANDS BY LOCATION (keep)
app.get("/api/lands/search/:location", async (req, res) => {
  try {
    const location = req.params.location;
    const lands = await Land.find({
      location: { $regex: location, $options: "i" },
    });
    res.json(lands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================================
// ✅ RENTS ROUTES
// ================================
app.use("/api/rents", rentRoutes);

// ✅ SEARCH RENTS BY LOCATION
app.get("/api/rents/search/:location", async (req, res) => {
  try {
    const location = req.params.location;
    const rents = await Rent.find({
      location: { $regex: location, $options: "i" },
    });
    res.json(rents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Static Uploads (keep for backward compatibility)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ✅ START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
