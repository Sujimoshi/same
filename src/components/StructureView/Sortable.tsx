import React, { ReactNode, useRef } from "react";
import { useDrop, useDrag, DropTargetMonitor, XYCoord } from "react-dnd";
import { DragAndDropWrapper } from "./styled";
import useDragMove from "@same/hooks/dragMove";
import { ComponentConfig, Node, isStyled } from "@same/configurator";
import { moveNode, placeNode, levelDown, levelUp } from "@same/utils/tree";
import { throttle } from "underscore";

export interface Props {
  children: ReactNode;
  data: Node;
  tree: Node;
  onChange: (tree: Node) => void;
  onDrop: (type: "after" | "into" | "before", node: Node) => void;
}

let position: XYCoord = null;

const getCoordDiff = (pos1: XYCoord, pos2: XYCoord): XYCoord => ({
  x: pos1.x - pos2.x,
  y: pos1.y - pos2.y
});

export default React.memo(function Sortable({
  children,
  onDrop,
  onChange,
  data,
  tree
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [droppingInto, drop] = useDrop({
    accept: ["structure", "components"],
    drop: ({ data, type }: any) =>
      type !== "structure" ? onDrop("into", data) : undefined,
    // eslint-disable-next-line complexity
    hover: throttle((item: any, monitor: DropTargetMonitor) => {
      if (item.type !== "structure") return;
      if (item.data === data) {
        const currentPosition = monitor.getClientOffset() || ({} as XYCoord);
        if (!position) return (position = currentPosition);
        const diff = getCoordDiff(currentPosition, position);
        if (diff.x > 20) {
          position = { ...position, x: currentPosition.x };
          onChange(levelDown(data.id)(tree));
        }
        if (diff.x < -20) {
          position = { ...position, x: currentPosition.x };
          onChange(levelUp(data.id)(tree));
        }
      } else {
        onChange(placeNode<Node>(item.data.id, data.id, "before")(tree));
      }
    }, 100)
  });

  const [dragging, drag, preview] = useDrag({
    item: { type: "structure", data },
    collect: monitor => monitor.isDragging()
  });

  return (
    <DragAndDropWrapper id={data.id} dragging={dragging} ref={drag(drop(ref))}>
      <div ref={preview} />
      {children}
    </DragAndDropWrapper>
  );
});
