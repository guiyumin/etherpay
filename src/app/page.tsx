"use client";

import styles from "./page.module.scss";
import { Typography } from "@arco-design/web-react";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { PaymentForm } from "root/components/PaymentForm";
import { Warnings } from "root/components/Warnings";
import { Payment, PaymentStep } from "root/types/Payment";

export default function Home() {
  const searchParams = useSearchParams();

  const [step, setStep] = useState<PaymentStep>("form");

  const orderId = searchParams?.get("orderId") || "";
  const amount = searchParams?.get("amount") || "";

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

  const goToStep = (nextStep: PaymentStep) => {
    setStep(nextStep);
  };

  return (
    <main className={styles.main}>
      <Typography.Title>Ether Pay</Typography.Title>
      {step === "form" && (
        <PaymentForm
          goToStep={goToStep}
          handleUpdatePayment={handleUpdatePayment}
          payment={payment}
        />
      )}
      {step === "warning" && <Warnings goToStep={goToStep} />}
    </main>
  );
}
