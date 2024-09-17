export type Payment = {
  orderId: string;
  receiver: string | string[] | undefined;
  payer_name: string;
  payer_email: string;
  amount: string;
  status:
    | "initiated"
    | "pending"
    | "paid"
    | "cancelled"
    | "refunded"
    | "failed";
};
