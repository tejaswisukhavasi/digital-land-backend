import express from "express";
import multer from "multer";
import path from "path";
import { protect } from "../middleware/authMiddleware.js";
import { addLand, getAllLands, getLandById } from "../controllers/landController.js";

const router = express.Router();

// multer setup
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

router.post("/", protect, upload.single("image"), addLand);
router.get("/", getAllLands);
router.get("/:id", getLandById);

export default router;
