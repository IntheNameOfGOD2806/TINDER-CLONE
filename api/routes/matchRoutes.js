import express from 'express';
import { protectedRoute } from '../middlewares/protectedRoute.js';
import { swipeLeft, swipeRight, getMatches, getUserProfile } from '../controllers/matchesController.js';
const matchRoutes = express.Router();

matchRoutes.post('/swipe-right/:likedUserId', protectedRoute, swipeRight);

matchRoutes.post('/swipe-left/:dislikedUserId', protectedRoute, swipeLeft);

matchRoutes.post('/get-matches', protectedRoute, getMatches);
matchRoutes.post('/user-profile', protectedRoute, getUserProfile);        



export default matchRoutes;