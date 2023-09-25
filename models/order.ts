import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderArray: { type: [Number], required: true },
});

export const OrderArray =
  mongoose.models.ordersarray || mongoose.model("ordersarray", orderSchema);
