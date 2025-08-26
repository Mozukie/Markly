import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  time: { type: String, required: true },
  day: { type: String, required: true },
  section: { type: String, required: true },
  schedule: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.model("Class", classSchema);