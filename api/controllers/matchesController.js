import User from "../models/user.model.js";
export const swipeRight = async (req, res) => {
    try {
        const { likedUserId } = req.params;
        const currentUser = await User.findById(req.user._id);
        const likedUser = await User.findById(likedUserId);
        if (!likedUser) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        if (currentUser.likes.includes(likedUserId) && likedUser.likes.includes(currentUser._id)) {
            await User.findByIdAndUpdate(likedUserId, {
                $addToSet: {
                    matches: currentUser._id,
                },
            });
            await User.findByIdAndUpdate(currentUser._id, {
                $addToSet: {
                    matches: likedUserId,
                },
            });
        }
        else if (!currentUser.likes.includes(likedUserId)) {
            await User.findByIdAndUpdate(likedUserId, {
                $addToSet: {
                    matches: likedUserId,
                },
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const swipeLeft = async (req, res) => {
    try {
        const { dislikedUserId } = req.params;
        const currentUser = await User.findById(req.user._id);
    
        await User.findByIdAndUpdate(currentUser._id, {
            $addToSet: {
                dislikes: dislikedUserId,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getMatches = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate({
            path: 'matches',
            select: 'name image ',
        });
        res.status(200).json({ success: true, matches: user.matches });
    } catch (error) {
        console.log(">>>error in getMatches:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id);
        const users = await User.find({
            $and: [
                { _id: { $ne: currentUser._id } },
                { _id: { $nin: currentUser.matches } },
                { _id: { $nin: currentUser.likes } },
                { _id: { $nin: currentUser.dislikes } },
                { genderPreference: { $in: ["both", currentUser.gender] } },
                { age: { $gte: currentUser.age } },
                { gender: currentUser.genderPreference === 'both' ? { $in: ["male", "female"] } : { $in: [currentUser.genderPreference, "both"] } },
            ],
        })
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.log(">>>error in getUserProfile:", error);
        res.status(500).json({ success: false, message: error.message });
    }

}