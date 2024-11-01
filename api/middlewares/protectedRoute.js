import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
export const protectedRoute = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        if (!cookies) return res.status(401).json({ success: false, message: 'Unauthorized' });
        if (!cookies.jwt) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        else {
            const token = cookies.jwt;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            else {
                const currentUser = await User.findById(decoded.id);
                if (!currentUser) {
                    return res.status(401).json({ success: false, message: 'Unauthorized' });
                }
                req.user = currentUser;
                next();
            }
        }
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized - invalid token'
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}