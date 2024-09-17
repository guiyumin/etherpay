import { Form, Input, Button, Message, Select } from "@arco-design/web-react";
import { IconCopy } from "@arco-design/web-react/icon";
import { useEffect, useState } from "react";
import { API_URL } from "root/utils/api";
import styles from "./PaymentForm.module.scss";
import { Payment } from "root/types/Payment";

const FormItem = Form.Item;

type Props = {
  payment: Payment;
  handleSubmit: (values: any) => void;

  handleUpdatePayment: (k: string, v: string) => void;
};

export const PaymentForm = (props: Props) => {
  const { payment, handleSubmit, handleUpdatePayment } = props;

  const [receiver, setReceiver] = useState<string | string[]>();

  useEffect(() => {
    fetch(API_URL.GET_RECEIVER)
      .then((res) => res.json())
      .then((data) => {
        if (data.receiver) {
          const _receiver = data.receiver.includes(",")
            ? data.receiver.split(",")
            : data.receiver;
          setReceiver(_receiver);
        } else {
          Message.error("No receiving address found");
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (typeof receiver === "string") {
      handleUpdatePayment("receiver", receiver);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiver]);

  return (
    <Form
      style={{ width: 600 }}
      autoComplete="off"
      layout="vertical"
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <FormItem label="Order Id" rules={[{ required: true }]}>
        <Input
          placeholder="please enter the order id"
          value={payment.orderId || ""}
          onChange={(v) => handleUpdatePayment("orderId", v)}
          name="orderId"
          autoFocus
          required
        />
      </FormItem>
      <FormItem
        label="Receiver Address (USDT ERC20)"
        rules={[{ required: true }]}
      >
        {typeof receiver === "string" && (
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
        )}

        {Array.isArray(receiver) && (
          <Select
            placeholder="please select receiving address"
            options={receiver.map((r) => ({
              label: r,
              value: r,
            }))}
            allowClear
            onChange={(v) => {
              handleUpdatePayment("receiver", v);
              navigator.clipboard.writeText(v);
              Message.success("Copied to clipboard");
            }}
          />
        )}
      </FormItem>
      <FormItem label="Amount" rules={[{ required: true }]}>
        <Input
          addBefore="$"
          placeholder="please enter the amount"
          value={payment.amount || "0"}
          onChange={(v) => handleUpdatePayment("amount", v)}
          name="amount"
          required
        />
      </FormItem>
      <FormItem label="Payer Name">
        <Input
          placeholder="please enter your name"
          value={payment.payer_name}
          onChange={(v) => handleUpdatePayment("payer_name", v)}
          name="payer_name"
        />
      </FormItem>
      <FormItem label="Payer Email" rules={[{ required: true }]}>
        <Input
          placeholder="please enter your email"
          value={payment.payer_email}
          onChange={(v) => handleUpdatePayment("payer_email", v)}
          name="payer_email"
          type="email"
          required
        />
      </FormItem>
      <FormItem label="status" hidden>
        <Input value={payment.status} />
      </FormItem>
      {/* <FormItem
          label={<Result status="warning" title="Risk Warning"></Result>}
        >
          <Checkbox>
            I&#39;m aware of the risk that I might lose all my money!
          </Checkbox>
        </FormItem>
        <FormItem
          label={
            <Result status="warning" title="ERC-20 deposits only"></Result>
          }
        >
          <Checkbox>
            Please confirm that your USDT is an ERC-20 token and that you are
            depositing it via the Ethereum Network. You understand that
            depositing assets on the wrong network may lead to a loss of funds.
          </Checkbox>
        </FormItem> */}
      <FormItem>
        <Button type="primary">Next</Button>
      </FormItem>
    </Form>
  );
};
