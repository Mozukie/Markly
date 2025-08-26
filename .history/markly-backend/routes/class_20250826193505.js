import express from "express";
import { protect } from "../middleware/auth.js";
import Class from "../models/class.js";
import Attendance from "../models/Attendance.js";

const router = express.Router();

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
    const { classSubject, classCode, classSection, classDays, classTime } = req.body;

    const expiration = Date.now() + 3600000; // default 1 hour
    const qrLink = `http://localhost:5000/attendance/${classCode}?expires=${expiration}`;

    const newClass = await Class.create({
      classSubject,
      classCode,
      classSection,
      classDays,                          
      classTime,
      schedule: `${classDays.join(", ")} ${classTime}`, 
      teacher: req.user._id,
      qrLink,
    });

    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put("/:id", protect, async (req, res) => {
  try {
    const updated = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete("/:id", protect, async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.json({ message: "Class deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/attendance/:id", async (req, res) => {
  const { expires } = req.query;
  if (Date.now() > parseInt(expires)) {
    return res.status(410).send("QR code expired");
  }
  // TODO: record attendance here
  res.send("QR valid, proceed with attendance marking");
});


router.get("/:classId/attendance", protect, async (req, res) => {
  try {
    const attendance = await Attendance.find({ classId: req.params.classId })
      .populate("studentId", "firstname lastname studentNumber");

    res.json(attendance.map((a) => ({
      _id: a._id,
      firstname: a.studentId.firstname,
      lastname: a.studentId.lastname,
      studentNumber: a.studentId.studentNumber,
      timestamp: a.timestamp,
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
