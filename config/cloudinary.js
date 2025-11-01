import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: "dy5swka6i",
  api_key: "869811178366368",
  api_secret: "GfnYWbbJYVu6I-oQYax4O6ELXWs" // <-- replace with your real Cloudinary secret
});

export default cloudinary;
