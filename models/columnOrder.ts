import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  columnOrderArray: { type: [Number], required: true },
});

export const OrderArray =
  mongoose.models.columnordersarray ||
  mongoose.model("columnordersarray", orderSchema);
