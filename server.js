import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import multer from "multer";
import fs from "fs";
import connectDB from "./config/db.js";

// ✅ IMPORT CONTROLLERS
import { registerUser, loginUser } from "./controllers/authController.js";
import { addLand, getAllLands, getLandById } from "./controllers/landController.js";
import rentRoutes from "./routes/rentRoutes.js";
import { protect } from "./middleware/authMiddleware.js";

// ✅ IMPORT MODELS (THIS WAS MISSING!)
import Land from "./models/Land.js";
import Rent from "./models/Rent.js";

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

// ✅ Ensure uploads folder exists
const uploadsDir = path.resolve("uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// ✅ Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

// ================================
// ✅ AUTH ROUTES
// ================================
app.post("/api/auth/register", registerUser);
app.post("/api/auth/login", loginUser);

// ================================
// ✅ LANDS ROUTES
// ================================
app.post("/api/lands", protect, upload.single("image"), addLand);
app.get("/api/lands", getAllLands);
app.get("/api/lands/:id", getLandById);

// ✅ ✅ SEARCH LANDS BY LOCATION
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

// ✅ ✅ SEARCH RENTS BY LOCATION
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

// ✅ Static Uploads
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ✅ START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
