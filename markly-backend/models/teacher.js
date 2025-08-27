import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
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
      min: 18, // teachers usually at least adults
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },

    // 🔹 Professional Profile
    subjects: {
      type: [String], // e.g. ["Math", "Science"]
      default: [],
    },
    expertise: {
      type: [String], // e.g. ["Algebra", "Physics"]
      default: [],
    },
    yearsOfExperience: {
      type: Number,
      default: 0,
    },
    bio: {
      type: String,
      default: "",
    },

    // 🔹 School Profile
    employeeId: {
      type: String,
      unique: true,
      sparse: true, 
    },
    department: {
      type: String,
    },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
