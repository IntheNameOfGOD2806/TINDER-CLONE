import express from 'express';
import { login, logout, register } from '../controllers/authController.js';
import { protectedRoute } from '../middlewares/protectedRoute.js';
const authRoutes = express.Router();


authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.post('/logout', logout);
authRoutes.post('/me', protectedRoute, (req, res) => {
    console.log(req?.user);
});




export default authRoutes;