import express from 'express';
import { updateProfile } from '../controllers/usersController.js';
import { protectedRoute } from '../middlewares/protectedRoute.js';
const userRoutes = express.Router();

userRoutes.put('/update',protectedRoute,updateProfile );

export default userRoutes;