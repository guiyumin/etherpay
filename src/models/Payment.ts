import mongoose from "mongoose";

export interface Payments extends mongoose.Document {
  orderId: string;
  payer_name: string;
  payer_email: string;
  receiver: string;
  amount: number;
  status:
    | "initiated"
    | "pending"
    | "paid"
    | "cancelled"
    | "refunded"
    | "failed"
    | "expired"
    | "completed"
    | "onchain";
}

/* PaymentSchema will correspond to a collection in your MongoDB database. */
const PaymentSchema = new mongoose.Schema<Payments>({
  orderId: {
    type: String,
    required: [true, "Please provide order id."],
  },
  payer_name: {
    type: String,
    required: [true, "Please provide payer's name"],
  },
  payer_email: {
    type: String,
    required: [true, "Please provide payer's email"],
  },
  receiver: {
    type: String,
    required: [true, "Please provide receiver"],
  },
  amount: {
    type: Number,
    required: [true, "Please provide amount"],
  },
  status: {
    type: String,
    enum: [
      "initiated",
      "pending",
      "paid",
      "cancelled",
      "refunded",
      "failed",
      "expired",
      "completed",
      "onchain",
    ],
    default: "initiated",
  },
});

export default mongoose.models.Payment ||
  mongoose.model<Payments>("Payment", PaymentSchema);
