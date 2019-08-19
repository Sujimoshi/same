import React, { ReactNode } from "react";
import { Button as StyledButton } from "@same/styled/Button";
import Icon from "../Icon";

export interface Props {
  children: ReactNode;
  prependIcon?: string;
  appendIcon?: string;
}

export default function Button({
  prependIcon,
  children,
  appendIcon,
  ...buttonProps
}: Props) {
  return (
    <StyledButton {...buttonProps}>
      {prependIcon && (
        <Icon icon={prependIcon} style={{ marginRight: "auto" }} />
      )}
      {children}
      {appendIcon && <Icon icon={appendIcon} style={{ marginLeft: "auto" }} />}
    </StyledButton>
  );
}
