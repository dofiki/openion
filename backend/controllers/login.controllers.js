import User from "../models/user.model.js";  
import { generatePassword } from "../utils/password.utils.js";

export const registerRoute = async (req, res) => {
  const { username, password, email, bio } = req.body; 
  try {
    const userExists = await User.findOne({ username }); 
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const { salt, hash } = generatePassword(password);

    const newUser = new User({
      username,
      email,
      bio,
      hash,
      salt
    });

    await newUser.save();
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

export const loginRoute = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = req.user.toObject ? req.user.toObject() : req.user;

    res.status(200).json({
      message: "Logged in",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email || "",
        bio: user.bio || "",
        followers: user.followers || [],
        following: user.following || [],
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const logoutRoute = (req, res) => {
  if (!req.logout) {
    return res.status(500).json({ message: "Logout function not available on request" });
  }

  req.logout(function(err) {
    if (err) return res.status(500).json({ message: "Logout error" });
    res.json({ message: "Logged out" });
  });
};

export const dashboardRoute = async (req, res) => {
  res.json({ message: `Hello ${req.user.username}, this is your dashboard.` });
}