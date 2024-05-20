"use client";

import styles from "./page.module.css";
import { Form, Input, Button, Checkbox } from "@arco-design/web-react";
const FormItem = Form.Item;

export default function Home() {
  return (
    <main className={styles.main}>
      <Form style={{ width: 600 }} autoComplete="off" layout="vertical">
        <FormItem label="USDT ERC20 Address">
          <Input placeholder="please enter your username..." />
        </FormItem>
        <FormItem label="Amount">
          <Input addBefore="$" placeholder="please enter the amount" />
        </FormItem>
        <FormItem>
          <Checkbox>I&#39;m aware of the risk</Checkbox>
        </FormItem>
        <FormItem>
          <Button type="primary">Next</Button>
        </FormItem>
      </Form>
    </main>
  );
}
