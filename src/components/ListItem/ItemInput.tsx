import React, { useEffect, useRef } from "react";
import { ItemWrapper, ItemContent } from "../StructureView/styled";
import { ListItemInput } from "./styled";
import { eventValue } from "@same/utils/helpers";

export interface Props {
  children?: string;
  onBlur: (value: string) => void;
}

export default function ItemInput({ onBlur, children }: Props) {
  const input = useRef<any>();

  useEffect(() => {
    if (input && input.current) input.current.focus();
  }, [children]);

  return (
    <ListItemInput
      type="text"
      ref={input}
      onBlur={eventValue(onBlur)}
      defaultValue={children}
    />
  );
}
