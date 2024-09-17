import {
  Button,
  Checkbox,
  Form,
  Message,
  Result,
} from "@arco-design/web-react";
import React, { useState } from "react";
import styles from "./Warnings.module.scss";
import { PaymentStep } from "root/types/Payment";

const FormItem = Form.Item;

type Props = {
  goToStep: (step: PaymentStep) => void;
};

export const Warnings = (props: Props) => {
  const { goToStep } = props;

  const [warnings, setWarnings] = useState({
    warning1: false,
    warning2: false,
  });

  const handleClickNext = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    if (warnings.warning1 && warnings.warning2) {
      goToStep("success");
    } else {
      Message.error("Please confirm the warnings");
    }
  };

  return (
    <div>
      <Form
        layout="vertical"
        className={styles.form}
        onSubmit={handleClickNext}
      >
        <FormItem
          label={
            <Result
              className={styles.Result}
              status="warning"
              title="Risk Warning"
            ></Result>
          }
        >
          <Checkbox
            value={warnings.warning1}
            onChange={(v) => setWarnings({ ...warnings, warning1: v })}
          >
            I&#39;m aware of the risk that I might lose all my money!
          </Checkbox>
        </FormItem>
        <FormItem
          label={
            <Result
              className={styles.Result}
              status="warning"
              title="ERC-20 Network only"
            ></Result>
          }
        >
          <Checkbox
            value={warnings.warning2}
            onChange={(v) => setWarnings({ ...warnings, warning2: v })}
          >
            Please confirm that your USDT is an ERC-20 token and that you are
            depositing it via the Ethereum Network. You understand that
            depositing assets on the wrong network may lead to a loss of funds.
          </Checkbox>
        </FormItem>

        <FormItem>
          <Button
            type="secondary"
            style={{ margin: "0 16px" }}
            onClick={() => goToStep("form")}
          >
            Back
          </Button>

          <Button type="primary" htmlType="submit" onClick={handleClickNext}>
            Next
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};
