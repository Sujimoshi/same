import React from "react";
import { ToggableInput } from "./styled";

export interface Props {
  children: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export default function EditableLabel(props: Props) {
  return (
    <ToggableInput
      type="text"
      placeholder={props.placeholder}
      value={props.children}
      onChange={e => props.onChange(e.target.value)}
    />
  );
}
