"use client";

import styles from "./page.module.css";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
} from "@arco-design/web-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const FormItem = Form.Item;

export default function Home() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");
  const receiver = searchParams.get("receiver");
  const amount = searchParams.get("amount");
  const timeslot = searchParams.get("timeslot");

  const [payment, setPayment] = useState(() => {
    return {
      orderId,
      receiver,
      amount,
      timeslot,
    };
  });

  const handleChange = (v: string, e: any) => {
    setPayment((p) => {
      return {
        ...p,
        [e.target.name]: v,
      };
    });
  };

  return (
    <main className={styles.main}>
      <Typography.Title>Ether Pay</Typography.Title>
      <Form style={{ width: 600 }} autoComplete="off" layout="vertical">
        <FormItem label="Order Id">
          <Input
            placeholder="please enter the order id"
            value={payment.orderId || ""}
            onChange={handleChange}
            name="orderId"
          />
        </FormItem>
        <FormItem label="Receiver Address (USDT ERC20)">
          <Input
            placeholder="please enter receiver's address"
            value={payment.receiver || ""}
            onChange={handleChange}
            name="receiver"
          />
        </FormItem>
        <FormItem label="Amount">
          <Input
            addBefore="$"
            placeholder="please enter the amount"
            value={payment.amount || "0"}
            onChange={handleChange}
            name="amount"
          />
        </FormItem>
        <FormItem label="timeslot" hidden>
          <Input value={payment.timeslot || ""} />
        </FormItem>
        <FormItem>
          <Checkbox>
            I&#39;m aware of the risk that I might lose all my money!
          </Checkbox>
        </FormItem>
        <FormItem>
          <Button type="primary">Next</Button>
        </FormItem>
      </Form>
    </main>
  );
}
