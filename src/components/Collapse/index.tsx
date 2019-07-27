import React, { ReactNode, useState } from "react";
import { ItemWrapper } from "../styled/List";

export interface Props {
  renderTitle: () => ReactNode | ReactNode[];
  expanded?: boolean;
  children: () => ReactNode | ReactNode[];
}

export default function Collapse({
  renderTitle,
  expanded = false,
  children
}: Props) {
  const [exp, setExp] = useState(expanded);
  return (
    <div>
      <ItemWrapper onClick={() => setExp(!exp)}>{renderTitle()}</ItemWrapper>
      {exp && children()}
    </div>
  );
}
