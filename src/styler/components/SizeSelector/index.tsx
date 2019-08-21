import React, { useState, ReactNode } from "react";
import Input from "@same/components/Input";
import DropSelect from "@same/components/DropSelect";
import { eventValue } from "@same/utils/helpers";
import { Button } from "@same/styled/Button";
import { Text } from "@same/styled/Typography";

export interface Type {
  value: string;
  label: string;
}

export interface Props {
  onChange: (value: string) => void;
  value: string;
  types?: Type[];
  prepend?: ReactNode;
}

const types = [
  { label: "PX", value: "px" },
  { label: "%", value: "%" },
  { label: "REM", value: "rem" },
  { label: "EM", value: "em" },
  { label: "VW", value: "vw" },
  { label: "VH", value: "vh" }
];

export default React.memo(function SizeSelector({
  onChange,
  value = "",
  prepend
}: Props) {
  const [type, setType] = useState(
    types.find(type => value.includes(type.value)) || types[0]
  );

  const onTypeChange = (nextType: Type) => {
    setType(nextType);
    onValueChange(value, nextType);
  };

  const onValueChange = (nextValue: string, nextType: Type) => {
    onChange(
      nextValue ? nextValue.replace(type.value, "") + nextType.value : ""
    );
  };

  return (
    <Input
      value={value.replace(type.value, "")}
      onChange={eventValue(nextValue => onValueChange(nextValue, type))}
      type="number"
      prepend={prepend}
      append={
        <DropSelect
          button={<Button>{type.label}</Button>}
          value={type.value}
          renderItem={option => (
            <Text row center>
              {option.label}
            </Text>
          )}
          onChange={nextType => onTypeChange(nextType)}
          options={types}
        />
      }
    />
  );
});
