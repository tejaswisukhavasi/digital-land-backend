import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import { addRent, getAllRents, getRentById } from "../controllers/rentController.js"; // ✅ Added getRentById

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
router.get("/:id", getRentById); // ✅ Added route for single rent

export default router;
