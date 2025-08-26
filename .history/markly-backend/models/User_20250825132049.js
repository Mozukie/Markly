import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },

  // New profile fields
 role: { 
    type: String, 
    enum: ["Teacher", "Student"], 
    default: "Student" 
},
  subjects: [{ type: String }], // Array of subjects for teachers
  section: { type: String},    // Works for both Teacher & Student
  studentNumber: { type: String } // Only for Students
}, {
  timestamps: true // adds createdAt & updatedAt
});

export default mongoose.model("User", userSchema);
