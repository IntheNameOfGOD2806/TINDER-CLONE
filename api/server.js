import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import msgRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';
const __dirname = path.resolve();
dotenv.config({ path: __dirname + '/.env' });
const PORT =process.env.PORT || 2806;


const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
//
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
//
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', msgRoutes);
app.use('/api/matches', matchRoutes);

export default app;






