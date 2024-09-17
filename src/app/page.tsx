"use client";

import styles from "./page.module.scss";
import { Typography } from "@arco-design/web-react";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { PaymentForm } from "root/components/PaymentForm";
import { Payment } from "root/types/Payment";

export default function Home() {
  const searchParams = useSearchParams();

  const orderId = searchParams?.get("orderId") || "";
  const amount = searchParams?.get("amount") || "";

  const handleSubmit = (values: any) => {
    console.log("values", values);
  };

  const [payment, setPayment] = useState<Payment>({
    orderId,
    // default is undefined, if user select one, it will be a string
    // if user doesn't select, it will be undefined and there will be error
    receiver: undefined,
    payer_name: "",
    payer_email: "",
    amount,
    status: "initiated",
  });

  const handleUpdatePayment = (k: string, v: string) => {
    setPayment((p) => {
      return {
        ...p,
        [k]: v,
      };
    });
  };

  return (
    <main className={styles.main}>
      <Typography.Title>Ether Pay</Typography.Title>
      <PaymentForm
        handleSubmit={handleSubmit}
        handleUpdatePayment={handleUpdatePayment}
        payment={payment}
      />
    </main>
  );
}
