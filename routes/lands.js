import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import cloudinary from "../config/cloudinaryConfig.js";
import { protect } from "../middleware/authMiddleware.js";
import { addLand, getAllLands, getLandById } from "../controllers/landController.js";

const router = express.Router();

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "digital-land/lands", // Folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

// Routes
router.post("/", protect, upload.single("image"), addLand);
router.get("/", getAllLands);
router.get("/:id", getLandById);

export default router;
