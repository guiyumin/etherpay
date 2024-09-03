"use client";

import styles from "./page.module.scss";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Message,
} from "@arco-design/web-react";
import { IconCopy } from "@arco-design/web-react/icon";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const FormItem = Form.Item;

export default function Home() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const timeslot = searchParams.get("timeslot");

  const [receiver, setReceiver] = useState("");

  useEffect(() => {
    fetch("/api/receiver")
      .then((res) => res.json())
      .then((data) => setReceiver(data.receiver))
      .catch((err) => console.error(err));
  }, []);

  const [payment, setPayment] = useState(() => {
    return {
      orderId,
      receiver,
      payer: {
        name: "",
        email: "",
      },
      amount,
      timeslot,
      status: "initiated",
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
      <Form
        style={{ width: 600 }}
        autoComplete="off"
        layout="vertical"
        className={styles.form}
      >
        <FormItem label="Order Id">
          <Input
            placeholder="please enter the order id"
            value={payment.orderId || ""}
            onChange={handleChange}
            name="orderId"
            autoFocus
          />
        </FormItem>
        <FormItem label="Receiver Address (USDT ERC20)">
          <Input
            placeholder="please enter receiver's address"
            value={receiver}
            name="receiver"
            readOnly
            suffix={
              <IconCopy
                className={styles.iconCopy}
                onClick={() => {
                  navigator.clipboard.writeText(receiver);
                  Message.success("Copied to clipboard");
                }}
              />
            }
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
        <FormItem label="Payer Name">
          <Input
            placeholder="please enter the payer's name"
            value={payment.payer.name}
            onChange={handleChange}
            name="payer.name"
          />
        </FormItem>
        <FormItem label="Payer Email">
          <Input
            placeholder="please enter the payer's email"
            value={payment.payer.email}
            onChange={handleChange}
            name="payer.email"
            type="email"
          />
        </FormItem>
        <FormItem label="timeslot" hidden>
          <Input value={payment.timeslot || ""} />
        </FormItem>
        <FormItem label="status" hidden>
          <Input value={payment.status} />
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
