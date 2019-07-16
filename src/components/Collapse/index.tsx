import React, { ReactNode, useState } from "react";
import { ItemWrapper } from "../styled/List";

export interface Props {
  title: ReactNode;
  expanded?: boolean;
  children: ReactNode;
}

export default function Collapse({ title, expanded = false, children }: Props) {
  const [exp, setExp] = useState(expanded);
  return (
    <div>
      <ItemWrapper onClick={() => setExp(!exp)}>{title}</ItemWrapper>
      {exp && children}
    </div>
  );
}
