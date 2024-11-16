import User from "../models/user.model.js";
import { signToken } from "../utils/signToken.js";
const register = async (req, res) => {
  const { name, email, password, age, gender, genderPreference,repeatPassword,job } = req.body;

  try {
    if (!name || !email || !password || !age || !gender || !genderPreference || !repeatPassword || !job) {
      return res
        .status(400)
        .json({ success: false, msg: "Please enter all fields" });
    }
    if (age < 18) {
      return res
        .status(400)
        .json({ success: false, msg: "Age must be greater than 18" });
    }
    if(password !== repeatPassword){
      return res
        .status(400)
        .json({ success: false, msg: "Passwords do not match, please try again" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exists" });
    }
    const newUser = new User({
      name,
      email,
      password,
      age,
      gender,
      genderPreference,
    });
    await newUser.save();
    const token = signToken(String(newUser._id));
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "Please enter all fields" });
  }
  const user = await User.findOne({ email }).select("+password");
  const userToRes = await User.findOne({ email }).select("-password");

  if (!user) {
    return res.status(400).json({ success: false, msg: "User does not exist" });
  }
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(400).json({ success: false, msg: "Invalid User" });
  }
  const token = signToken(String(user._id));
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
  res.status(200).json({ success: true, user: userToRes });
};

const logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ success: true, message: "Logout successful" });
};

export { login, logout, register };
