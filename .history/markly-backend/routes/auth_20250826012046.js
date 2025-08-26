import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Class from "../models/Classes.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// @register
router.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role: role || "Student",
    });

    res.status(201).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      section: user.section,
      studentNumber: user.studentNumber,
      subjects: user.subjects,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      section: user.section,
      studentNumber: user.studentNumber,
      subjects: user.subjects,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/classes", protect, async (req, res) => {
  try {
    const { classSubject, classCode, classSection, classDay, classTime } = req.body;

    // Optional: Check for duplicate classCode
    const existing = await Class.findOne({ classCode });
    if (existing) {
      return res.status(400).json({ message: "Class code already exists" });
    }

    const newClass = await Class.create({
      classSubject,
      classCode,
      classSection,
      classDay,
      classTime,
      schedule: `${classDay} ${classTime}`,
      teacher: req.user._id,
    });

    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/classdata", protect, async (req, res) => {
  try {
    const classes = await Class.find({ teacher: req.user._id });
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @update profile
router.put("/profile", protect, async (req, res) => {
  try {
    const { role, subjects, section, studentNumber } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role || user.role;
    user.section = section || user.section;
    user.studentNumber = role === "Student" ? studentNumber || user.studentNumber : "";
    user.subjects = role === "Teacher" ? subjects || user.subjects : [];

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/classes/:id
router.delete("/classes/:id", protect, async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) return res.status(404).json({ message: "Class not found" });
    res.json({ message: "Class deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



export default router;
