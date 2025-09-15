import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  status: { type: String, default: false },
  description: { type: String, default: false },
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);
