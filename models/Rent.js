import mongoose from "mongoose";

const rentSchema = mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  rentType: { type: String, required: true },
  size: { type: Number },
  price: { type: Number, required: true },
  duration: { type: String },
  description: { type: String },
  email: { type: String, required: true },
  image: { type: String }
}, { timestamps: true });

const Rent = mongoose.model("Rent", rentSchema);
export default Rent;
