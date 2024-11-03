import express from 'express';
import { getAllMessages, sendMessage } from '../controllers/messageController.js';
const msgRoutes = express.Router();

msgRoutes.get('/send-message', sendMessage);
msgRoutes.get('/get-message/:userToChatId', getAllMessages);

export default msgRoutes;