import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  columnId: { type: String, required: true },
  content: { type: String, required: true },
});

export const Tasks = mongoose.model("Tasks", TaskSchema);
