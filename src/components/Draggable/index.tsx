import { useDrag } from "react-dnd";
import React, { ReactNode } from "react";

export interface Props {
  type: string;
  data: any;
  children: ReactNode;
}

export default React.memo(function Draggable({ type, data, children }: Props) {
  const [, drag] = useDrag({ item: { data, type } });

  return <div ref={drag}>{children}</div>;
});
