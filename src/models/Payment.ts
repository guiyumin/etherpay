import mongoose from "mongoose";

export interface Payments extends mongoose.Document {
  orderId: string;
  payer_name: string;
  payer_email: string;
  receiver: string;
  amount: number;
  timeslot: string;
  status:
    | "initiated"
    | "pending"
    | "paid"
    | "cancelled"
    | "refunded"
    | "failed";
}

/* PaymentSchema will correspond to a collection in your MongoDB database. */
const PaymentSchema = new mongoose.Schema<Payments>({
  orderId: {
    type: String,
    required: [true, "Please provide an id for this order."],
  },
  payer_name: {
    type: String,
    required: [true, "Please provide the payer's name"],
  },
  payer_email: {
    type: String,
    required: [true, "Please provide the payer's email"],
  },
  receiver: {
    type: String,
    required: [true, "Please provide the receiver"],
  },
  amount: {
    type: Number,
    required: [true, "Please provide the amount"],
  },
  timeslot: {
    type: String,
    required: [true, "Please provide the timeslot"],
  },
  status: {
    type: String,
    enum: ["initiated", "pending", "paid", "cancelled", "refunded", "failed"],
    default: "initiated",
  },
});

export default mongoose.models.Order ||
  mongoose.model<Payments>("Payment", PaymentSchema);
