import Land from "../models/Land.js";

export const addLand = async (req, res) => {
  try {
    const { title, location, price, size, sizeValue, description } = req.body;

    // ✅ Cloudinary gives 'req.file.path' as the uploaded image URL
    const imageUrl = req.file ? req.file.path : null;

    const land = await Land.create({
      title,
      location,
      price,
      size,
      sizeValue: sizeValue ? Number(sizeValue) : undefined,
      description,
      image: imageUrl,
      seller: req.user._id
    });

    res.status(201).json(land);
  } catch (err) {
    console.error("❌ Error adding land:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getAllLands = async (req, res) => {
  try {
    const lands = await Land.find().populate("seller", "name email");
    res.json(lands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getLandById = async (req, res) => {
  try {
    const land = await Land.findById(req.params.id).populate("seller", "name email");
    if (!land) return res.status(404).json({ message: "Land not found" });
    res.json(land);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
