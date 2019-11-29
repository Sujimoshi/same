import React, { ReactNode, useState } from "react";
import Group from "../Group";

export interface Props {}

export default function StateGroup(props: Props) {
  const [currentState, setCurrentState] = useState(null);
  return (
    <Group fixed title="States">
      some
    </Group>
  );
}
