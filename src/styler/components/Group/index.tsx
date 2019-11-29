import React, { ReactNode } from "react";
import { Group as GroupStyle, GroupHeader } from "@same/styler/styled/Group";

export interface Props {
  children: ReactNode;
  title: string;
  fixed?: boolean;
}

export default function Group({ fixed, title, children }: Props) {
  return (
    <GroupStyle fixed={fixed}>
      <GroupHeader>{title}</GroupHeader>
      {children}
    </GroupStyle>
  );
}
