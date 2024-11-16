import express from "express";
import { sendOTP } from "../controllers/otp.controller.js";

const OtpRouter = express.Router();
OtpRouter.post("/send-otp", sendOTP);
export default OtpRouter;
