import mongoose from "mongoose";

const landSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String },
    sizeValue: { type: Number },
    description: { type: String },
    image: { type: String }, // stores filename or image path
    seller: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", // Reference to User model
      required: true 
    },
  },
  { timestamps: true }
);

const Land = mongoose.model("Land", landSchema);
export default Land;
