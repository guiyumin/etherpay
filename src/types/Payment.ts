export type Payment = {
  orderId: string;
  receiver: string | string[] | undefined;
  payer: {
    name: string;
    email: string;
  };
  amount: string;
  timeslot: string;
  status:
    | "initiated"
    | "pending"
    | "paid"
    | "cancelled"
    | "refunded"
    | "failed";
};
