import React, { ReactNode, InputHTMLAttributes } from "react";
import {
  InputWrapper,
  Input as StyledInput,
  InputBox
} from "@same/styled/Input";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  prepend?: ReactNode;
  append?: ReactNode;
}

export default function Input({ prepend, append, ...inputProps }: Props) {
  return (
    <InputWrapper>
      {prepend && React.Children.map(prepend, el => <InputBox>{el}</InputBox>)}
      <StyledInput prepended={prepend} appended={append} {...inputProps} />
      {append && React.Children.map(append, el => <InputBox>{el}</InputBox>)}
    </InputWrapper>
  );
}
