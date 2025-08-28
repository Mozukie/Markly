import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    // Link to User (auth system)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🔹 Personal Profile
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    age: {
      type: Number,
      min: 3,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },

    // 🔹 Academic Profile
    class: {
      type: String,
    },
    section: {
      type: String,
    },
    studentNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    clubs: {
      type: [String],
      default: [],
    },

    // 🔹 Guardian Info
    guardianName: {
      type: String,
    },
    guardianEmail: {
      type: String,
      lowercase: true,
    },
    guardianPhone: {
      type: String,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
