import Rent from "../models/Rent.js";


export const addRent = async (req, res) => {
  try {
    const { title, location, rentType, size, price, duration, description, email } = req.body;
    const imageFile = req.file ? req.file.filename : null;

    const rent = await Rent.create({
      title,
      location,
      rentType,
      size: size ? Number(size) : undefined,
      price,
      duration,
      description,
      email,
      image: imageFile
    });

    res.status(201).json(rent);
  } catch (err) {
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
