import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },

  role: { type: String, enum: ["Teacher", "Student"], default: "Student" },
  subjects: [{ type: String }],       // For teachers
  section: { type: String, default: "" },   
  studentNumber: { type: String, default: "" }, // For students
}, { timestamps: true });

export default mongoose.model("User", userSchema);