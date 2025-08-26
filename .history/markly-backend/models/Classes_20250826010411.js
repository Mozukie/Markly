import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  classSubject: { type: String, required: true },
  classCode: { type: String, required: true, unique: true },
  time: { type: String, required: true },
  day: { type: String, required: true },
  schedule: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  section: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

export default mongoose.model("Class", classSchema);