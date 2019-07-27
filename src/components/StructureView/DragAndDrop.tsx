import React, { ReactNode } from "react";
import { useDrop, useDrag } from "react-dnd";
import { DragAndDropWrapper, InsertDropArea, AppendDropArea } from "./styled";

export interface Props {
  children: ReactNode;
  data: any;
  onDrop: (type: "before" | "into" | "after", data: any) => void;
}

export default React.memo(function DragAndDrop({
  children,
  onDrop,
  data
}: Props) {
  const [droppingInto, dropIntoRef] = useDrop({
    accept: ["component", "node"],
    drop: ({ data }: any) => onDrop("into", data),
    collect: monitor => monitor.isOver()
  });

  const [droppingAfter, dropAfterRef] = useDrop({
    accept: ["component", "node"],
    drop: ({ data }: any) => onDrop("after", data),
    collect: monitor => monitor.isOver()
  });

  const [droppingBefore, dropBeforeRef] = useDrop({
    accept: ["component", "node"],
    drop: ({ data }: any) => onDrop("before", data),
    collect: monitor => monitor.isOver()
  });

  const [dragging, dragRef] = useDrag({
    item: { type: "node", data },
    collect: monitor => monitor.isDragging()
  });

  return (
    <DragAndDropWrapper ref={dragRef}>
      <InsertDropArea
        dropping={droppingBefore}
        ref={dropBeforeRef}
        place="top"
      />
      <AppendDropArea dropping={droppingInto} ref={dropIntoRef}>
        {children}
      </AppendDropArea>
      <InsertDropArea
        dropping={droppingAfter}
        ref={dropAfterRef}
        place="bottom"
      />
    </DragAndDropWrapper>
  );
});
