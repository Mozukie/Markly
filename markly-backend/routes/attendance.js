// routes/attendance.js
import express from "express";
import Attendance from "../models/Attendance.js";
// import Class from "../models/class.js";
import { protect } from "../middleware/auth.js";
import express from "express";
import { recordAttendance } from "../controllers/attendance.js";

const router = express.Router();

// Student scans QR -> record attendance
router.post("/record", protect, recordAttendance);

// 👉 Student scans QR → record attendance
router.post("/:classId", protect, async (req, res) => {
  try {
    const { classId } = req.params;
    const studentId = req.user.id; // from JWT

    // Prevent duplicate attendance
    const existing = await Attendance.findOne({ classId, student: studentId });
    if (existing) {
      return res.status(400).json({ message: "Attendance already recorded" });
    }

    const attendance = new Attendance({
      classId,
      student: studentId,
    });

    await attendance.save();
    res.json({ message: "Attendance recorded", attendance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👉 Teacher view: get all attendance for a class
router.get("/:classId", protect, async (req, res) => {
  try {
    const { classId } = req.params;

    const records = await Attendance.find({ classId })
      .populate("student", "firstname lastname studentNumber email");

    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👉 Student view: get all classes attended
router.get("/student/me", protect, async (req, res) => {
  try {
    const studentId = req.user.id;

    const records = await Attendance.find({ student: studentId })
      .populate({
        path: "classId",
        populate: { path: "teacher", select: "firstname lastname email" },
      });

    // Shape data to match your frontend ClassAttended.jsx
    const attendedClasses = records.map(r => ({
      _id: r.classId._id,
      classSubject: r.classId.subject,
      classCode: r.classId.code,
      classSection: r.classId.section,
      teacher: {
        name: `${r.classId.teacher.firstname} ${r.classId.teacher.lastname}`,
        email: r.classId.teacher.email,
      },
      attendedAt: r.timestamp,
    }));

    res.json(attendedClasses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
