import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { getProfile } from "../controllers/User.js";
import { protect, authorize } from "../middleware/auth.js";


const router = express.Router();

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @route   POST /api/auth/register
// @desc    Register user
// @route   POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role: role || "Student", // ✅ fallback role
    });

    res.status(201).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role, // ✅ return role
      section: user.section || "",
      studentNumber: user.studentNumber || "",
      subjects: user.subjects || [],
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @route   POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role, // ✅ return role
      section: user.section || "",
      studentNumber: user.studentNumber || "",
      subjects: user.subjects || [],
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put("/profile", protect, async (req, res) => {
  try {
    const { role, subjects, section, studentNumber } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields
    user.role = role || user.role;
    if (role === "Teacher") {
      user.subjects = subjects || user.subjects;
      user.section = section || user.section;
    } else if (role === "Student") {
      user.section = section || user.section;
      user.studentNumber = studentNumber || user.studentNumber;
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/me", protect, getProfile, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});


export default router;
