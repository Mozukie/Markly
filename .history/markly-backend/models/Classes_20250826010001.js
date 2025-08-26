import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  classSubject: { type: String, required: true },
  classCode: { type: String, required: true, unique: true },
  schedule: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

export default mongoose.model("Class", classSchema);