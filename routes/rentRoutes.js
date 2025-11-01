import express from "express";
import multer from "multer";
import path from "path";
import { addRent, getAllRents } from "../controllers/rentController.js";

const router = express.Router();
const uploadsDir = path.resolve("uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`)
});

const upload = multer({ storage });

// ✅ Routes
router.post("/", upload.single("image"), addRent);
router.get("/", getAllRents);

export default router;
