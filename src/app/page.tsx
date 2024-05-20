"use client";

import styles from "./page.module.css";
import { Form, Input, Button, Checkbox } from "@arco-design/web-react";
const FormItem = Form.Item;

export default function Home() {
  return (
    <main className={styles.main}>
      <Form style={{ width: 600 }} autoComplete="off" layout="vertical">
        <FormItem label="Username">
          <Input placeholder="please enter your username..." />
        </FormItem>
        <FormItem label="Post">
          <Input placeholder="please enter your post..." />
        </FormItem>
        <FormItem>
          <Checkbox>I have read the manual</Checkbox>
        </FormItem>
        <FormItem>
          <Button type="primary">Next</Button>
        </FormItem>
      </Form>
    </main>
  );
}
