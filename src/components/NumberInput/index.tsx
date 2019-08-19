import React, { ReactNode, useState } from "react";
import styled from "@emotion/styled";
import { eventValue } from "../../utils/helpers";

export const InputContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
});

export const Label = styled.label({
  fontSize: "12px"
});

export const Input = styled.input({
  border: "0",
  padding: "3px",
  display: "flex",
  "&:focus": {
    outline: "none"
  },
  width: "100%"
});

export const InputWrapper = styled.div({
  display: "flex",
  flexDirection: "row",
  border: "1px solid #3e3640",
  borderRadius: "5px",
  overflow: "hidden"
});

export const Box = styled.div((props: any) => ({
  color: props.focus ? "lightblue" : "lightgray",
  cursor: "pointer",
  minWidth: "21px",
  height: "21px",
  fontSize: "12px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderLeft: "1px solid #3e3640"
}));

export interface Props {
  title: string;
  onChange: (value: string) => void;
  value: string;
  types: string[];
}

export default function NumberInput({
  title,
  onChange,
  types,
  value = ""
}: Props) {
  const currentType = types.find(el => value.includes(el)) || types[0];
  const [type, setType] = useState(currentType);
  const [val, setVal] = useState(value.replace(currentType, ""));

  const onInputChange = (eventVal: string) => {
    setVal(eventVal);
    eventVal ? onChange(eventVal + type) : onChange("");
  };

  const onTypeChange = (el: string) => () => {
    setType(el);
    val ? onChange(val + el) : onChange("");
  };

  return (
    <InputContainer>
      <Label>{title}</Label>
      <InputWrapper>
        <Input type="number" value={val} onChange={eventValue(onInputChange)} />
        {types.map(el => (
          <Box key={el} focus={type === el} onClick={onTypeChange(el)}>
            {el}
          </Box>
        ))}
      </InputWrapper>
    </InputContainer>
  );
}
