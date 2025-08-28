import Attendance from "../models/Attendance.js";

export const recordAttendance = async (req, res) => {
  try {
    const { classId } = req.query; // from QR params
    const studentId = req.user._id; // from auth token

    if (!classId) {
      return res.status(400).json({ message: "Class ID is required" });
    }

    // Save attendance
    const attendance = await Attendance.create({
      classId,
      student: studentId,
      timestamp: new Date(),
    });

    res.json({ message: "Attendance recorded", attendance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error recording attendance" });
  }
};
