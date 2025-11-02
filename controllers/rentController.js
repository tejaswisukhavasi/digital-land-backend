import Rent from "../models/Rent.js";
import cloudinary from "../config/cloudinary.js"; // ✅ Import Cloudinary

export const addRent = async (req, res) => {
  try {
    const { title, location, rentType, size, price, duration, description, email } = req.body;

    let imageUrl = null;

    // ✅ If image is uploaded, use the Cloudinary path
    if (req.file && req.file.path) {
      imageUrl = req.file.path; // multer-storage-cloudinary auto-uploads and provides Cloudinary URL
    }

    const rent = await Rent.create({
      title,
      location,
      rentType,
      size: size ? Number(size) : undefined,
      price,
      duration,
      description,
      email,
      image: imageUrl, // ✅ Store Cloudinary URL
    });

    res.status(201).json(rent);
  } catch (err) {
    console.error("Error adding rent:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getAllRents = async (req, res) => {
  try {
    const rents = await Rent.find();
    res.json(rents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
