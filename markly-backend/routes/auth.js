import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Class from "../models/class.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

/* ===========================
   AUTH ROUTES
=========================== */

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


/* ===========================
   CLASS ROUTES
=========================== */

router.get("/classdata", protect, async (req, res) => {
  try {
    const classes = await Class.find({ teacher: req.user._id });
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/classes/:id", protect, async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) return res.status(404).json({ message: "Class not found" });
    res.json({ message: "Class deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/* ===========================
   USER PROFILE ROUTES
=========================== */

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


/* ===========================
   STUDENT CRUD ROUTES
=========================== */

// ➤ Get all students
router.get("/students", protect, async (req, res) => {
  try {
    const students = await User.find({ role: "Student" }).select("-password");
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➤ Get single student by ID
router.get("/students/:id", protect, async (req, res) => {
  try {
    const student = await User.findById(req.params.id).select("-password");
    if (!student || student.role !== "Student")
      return res.status(404).json({ error: "Student not found" });
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➤ Update student by ID
router.put("/students/:id", protect, async (req, res) => {
  try {
    const updatedStudent = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedStudent || updatedStudent.role !== "Student")
      return res.status(404).json({ error: "Student not found" });

    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ➤ Delete student by ID
router.delete("/students/:id", protect, async (req, res) => {
  try {
    const deletedStudent = await User.findByIdAndDelete(req.params.id);
    if (!deletedStudent || deletedStudent.role !== "Student")
      return res.status(404).json({ error: "Student not found" });

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/teacher/:id", protect, async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ user: req.params.id });
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE teacher profile
router.put("/teacher/:id", protect, async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findOneAndUpdate(
      { user: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedTeacher) return res.status(404).json({ message: "Teacher not found" });
    res.json(updatedTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE teacher profile
router.delete("/teacher/:id", protect, async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findOneAndDelete({ user: req.params.id });
    if (!deletedTeacher) return res.status(404).json({ message: "Teacher not found" });
    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
