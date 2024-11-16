import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
(async function () {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    // Click 'View API Keys' above to copy your API secret
  });

  // Upload an image
  //   const uploadResult = await cloudinary.uploader
  //     .upload("../assets/dat.jpg", {
  //       public_id: "dat-heil",
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   console.log(uploadResult);

  // Optimize delivery by resizing and applying auto-format and auto-quality
  //   const optimizeUrl = cloudinary.url("shoes", {
  //     fetch_format: "auto",
  //     quality: "auto",
  //   });

  //   console.log(optimizeUrl);

  //   // Transform the image: auto-crop to square aspect_ratio
  //   const autoCropUrl = cloudinary.url("shoes", {
  //     crop: "auto",
  //     gravity: "auto",
  //     width: 500,
  //     height: 500,
  //   });

  //   console.log(autoCropUrl);
})();

export default cloudinary;
