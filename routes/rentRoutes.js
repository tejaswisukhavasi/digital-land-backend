import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary"; // ✅ missing import
import cloudinary from "../config/cloudinary.js"; // ✅ correct path
import { addRent, getAllRents } from "../controllers/rentController.js";

const router = express.Router();

// ✅ Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "rent_images", // folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

// ✅ Routes
router.post("/", upload.single("image"), addRent);
router.get("/", getAllRents);

export default router;
