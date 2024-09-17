import { Checkbox, Form, Result } from "@arco-design/web-react";
import React from "react";
import styles from "./Warnings.module.scss";

const FormItem = Form.Item;

export const Warnings = () => {
  return (
    <div>
      <Form layout="vertical" className={styles.form}>
        <FormItem
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
        </FormItem>
      </Form>
    </div>
  );
};
