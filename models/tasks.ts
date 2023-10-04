import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  columnId: { type: String, required: true },
  content: { type: String, required: true },
  taskorder: { type: Number, required: true },
});

export const Tasks =
  mongoose.models.Tasks || mongoose.model("Tasks", TaskSchema);
