import React, { ReactNode, useState } from "react";

export interface Props {
  renderTitle: (
    toggle: (set?: boolean) => void,
    expanded: boolean
  ) => ReactNode | ReactNode[];
  expanded?: boolean;
  children: (toggle: (set?: boolean) => void) => ReactNode | ReactNode[];
}

export default function Collapse({
  renderTitle,
  expanded = false,
  children
}: Props) {
  const [exp, setExp] = useState(expanded);
  const toggle = (set?: boolean) => setExp(set || !exp);

  return (
    <>
      {renderTitle(toggle, exp)}
      {exp && children(toggle)}
    </>
  );
}
