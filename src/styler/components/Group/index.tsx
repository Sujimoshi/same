import React, { ReactNode } from "react";
import { Group as GroupStyle, GroupHeader } from "@same/styler/styled/Group";

export interface Props {
  children: ReactNode;
  title: string;
}

export default function Group({ title, children }: Props) {
  return (
    <GroupStyle>
      <GroupHeader>{title}</GroupHeader>
      {children}
    </GroupStyle>
  );
}
