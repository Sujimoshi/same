import React, { useState } from "react";
import InlineSelector, {
  createTextOption,
  createIconOption
} from "@same/components/InlineSelector";
import Row from "@same/components/Row";
import Col from "@same/components/Col";

export interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function WrapSelector({ value = "", onChange }: Props) {
  const [reverse, setReverse] = useState(value.includes("-reverse"));
  const getValue = (val: string = value) =>
    val ? val.replace("-reverse", "") : "";

  const toggleReverse = () => {
    setReverse(!reverse);
    onValueChange(!reverse)(getValue());
  };

  const onValueChange = (reverse: boolean) => (nextVal: string) => {
    onChange(getValue(nextVal) + (reverse ? "-reverse" : ""));
  };

  return (
    <Row>
      <Col styled={{ paddingRight: "5px" }}>
        <InlineSelector
          options={[
            createTextOption("nowrap")("Don't wrap"),
            createTextOption("wrap")("Wrap")
          ]}
          value={getValue()}
          onChange={onValueChange(reverse)}
        />
      </Col>
      <Col size="24px">
        <InlineSelector
          disabled={getValue() !== "wrap"}
          options={[createIconOption(true)({ icon: "exchange" })]}
          value={reverse}
          onChange={toggleReverse}
        />
      </Col>
    </Row>
  );
}
