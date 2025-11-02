import Rent from "../models/Rent.js";

// ✅ Add new rent
export const addRent = async (req, res) => {
  try {
    const { title, location, rentType, size, price, duration, description, email } = req.body;

    // ✅ Use Cloudinary URL instead of local filename
    const imageUrl = req.file ? req.file.path : null;

    const rent = await Rent.create({
      title,
      location,
      rentType,
      size: size ? Number(size) : undefined,
      price,
      duration,
      description,
      email,
      image: imageUrl, // ✅ store Cloudinary URL
    });

    res.status(201).json(rent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all rents
export const getAllRents = async (req, res) => {
  try {
    const rents = await Rent.find();
    res.json(rents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get single rent by ID (for "View Details" page)
export const getRentById = async (req, res) => {
  try {
    const rent = await Rent.findById(req.params.id);
    if (!rent) {
      return res.status(404).json({ message: "Rent not found" });
    }
    res.json(rent);
  } catch (err) {
    console.error("Error fetching rent by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
};
