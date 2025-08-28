import express from "express";
import Attendance from "../models/classattendance.js";
import { protect } from "../middleware/auth.js";
import { recordAttendance } from "../controllers/attendance.js";

const router = express.Router();

// Student scans QR -> record attendance
router.post("/record", protect, recordAttendance);

// 👉 Student view: get all classes attended (MUST come before /:classId)
router.get("/student/me", protect, async (req, res) => {
  try {
    const studentId = req.user.id;

    const records = await Attendance.find({ student: studentId })
      .populate({
        path: "classId",
        populate: { path: "teacher", select: "firstname lastname email" },
      });

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

// 👉 Record attendance by classId
router.post("/:classId", protect, async (req, res) => {
  try {
    const { classId } = req.params;
    const studentId = req.user.id;

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

export default router;
