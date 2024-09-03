import mongoose from "mongoose";

const PayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the payer's name"],
  },
  email: {
    type: String,
    required: [true, "Please provide the payer's email"],
  },
});

export interface Orders extends mongoose.Document {
  orderId: string;
  payer: typeof PayerSchema;
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

/* PetSchema will correspond to a collection in your MongoDB database. */
const OrderSchema = new mongoose.Schema<Orders>({
  orderId: {
    type: String,
    required: [true, "Please provide an id for this order."],
  },
  payer: {
    type: PayerSchema,
    required: [true, "Please provide the payer"],
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
  mongoose.model<Orders>("Order", OrderSchema);
