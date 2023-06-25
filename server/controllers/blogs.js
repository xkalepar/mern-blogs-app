import User from "../models/User.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "Username already taken" });
    }

    // Create new user
    const newUser = await User.create({ username, password });

    // Generate JWT
    const token = newUser.createJWT();
    if (!token) {
      return res.status(500).json({ error: "Failed to generate token" });
    }

    // Send response
    res.status(201).cookie("token", token).json({ username, id: newUser._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({
          error:
            "cann't find user you looking for make sure of spelling the letters properly",
        });
    }

    const correctPassword = await user.comparePassword(password);
    if (!correctPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }
    const token = user.createJWT();
    if (!token) {
      return res.status(500).json({ error: "Failed to generate token" });
    }

    // Set cookie and send response
    res.cookie("token", token).json({ username, id: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
const profile = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    res.json(payload);
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  // res.cookie('token', ''); // Clear the "token" cookie
  try {
    res.cookie("token", " ").json({ msg: "logout completed" });
  } catch (error) {
    res.status(500).json({ msg: `cann't logout` });
  }
};

export { register, login, profile, logout };
