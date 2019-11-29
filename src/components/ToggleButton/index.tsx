import React, { ReactNode } from "react";
import { ToggleButton as ToggleButtonStyle } from "@same/styled/ToggleButton";

export interface Props {
  children: ReactNode;
}

export default function ToggleButton({ children }: Props) {
  return <ToggleButtonStyle>{children}</ToggleButtonStyle>;
}
