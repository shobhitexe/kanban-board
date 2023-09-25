import mongoose from "mongoose";

const columnSchema = new mongoose.Schema({
  title: { type: String, required: true },
  order: { type: Number, required: true },
});

export const Columns =
  mongoose.models.Columns || mongoose.model("Columns", columnSchema);
