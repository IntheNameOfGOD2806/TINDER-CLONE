import cloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
export const updateProfile = async (req, res) => {
    try {
        const { image, ...otherdatas } = req.body;

        let updateData = otherdatas
        if (image) {
            //base64 format
            if (image.startsWith('data:image')) {
                try {
                    const result = await cloudinary.uploader.upload(image, {
                        folder: 'users',
                        use_filename: true,
                        unique_filename: false,
                        overwrite: true
                    })
                    updateData = { ...updateData, image: result.secure_url }
                } catch (error) {
                    console.log(error);
                    res.status(400).json({ success: false, message: "error uploading image" });
                }
            }
        }
        const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
            new: true,
        });
        res.status(200).json({ success: true, user: updatedUser });



    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: error.message });
    }
}