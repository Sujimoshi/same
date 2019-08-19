import React, { ReactNode } from "react";
import { DropdownWrapper, DropdownButtonWrapper } from "@same/styled/Dropdown";
import { Panel } from "@same/styled/Panel";
import useDropdown from "@same/hooks/dropdown";

export interface Props {
  children: (toggle: (flag?: boolean) => void) => ReactNode;
  button: ReactNode;
  expanded?: boolean;
}

export default function Dropdown({ button, expanded, children }: Props) {
  const [flag, toggle, ref] = useDropdown(expanded);

  return (
    <DropdownWrapper ref={ref}>
      <DropdownButtonWrapper onClick={() => toggle()}>
        {button}
      </DropdownButtonWrapper>
      {flag && <Panel absolute>{children(toggle)}</Panel>}
    </DropdownWrapper>
  );
}
