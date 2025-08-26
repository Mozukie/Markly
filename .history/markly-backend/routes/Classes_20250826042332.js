import express from "express";
import { protect } from "../middleware/auth.js";
import Class from "../models/Classes.js";

const router = express.Router();

// GET all classes
router.get("/", protect, async (req, res) => {
  try {
    const classes = await Class.find({ teacher: req.user._id });
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new class
router.post("/", protect, async (req, res) => {
  try {
    const { classSubject, classCode, classSection, classDay, classTime } = req.body;
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

// PUT update class
router.put("/:id", protect, async (req, res) => {
  try {
    const updated = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE class
router.delete("/:id", protect, async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.json({ message: "Class deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
