import React, { ReactNode, useRef } from "react";
import { useDrop, useDrag, DropTargetMonitor, XYCoord } from "react-dnd";
import useDragMove from "@same/hooks/dragMove";

export interface Props {
  children: ReactNode;
  data: any;
  onDrop: (type: "before" | "into" | "after", data: any) => void;
}

export default function Sortable({ children, onDrop, data }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // const [droppingInto, drop] = useDrop({
  //   accept: ["structure", "components"],
  //   drop: ({ data, type }: any) =>
  //     type !== "structure" ? onDrop("into", data) : undefined,
  //   // eslint-disable-next-line complexity
  //   hover(item: any, monitor: DropTargetMonitor) {
  //     // if (monitor.isOver({ shallow: false })) return;
  //     if (item.type !== "structure") return;
  //     if (!ref.current) return;
  //     if (item.ref.current === ref.current) return;

  //     const over = item.ref.current;
  //     const under = ref.current;
  //     const getIndex = (li: HTMLElement) =>
  //       Array.prototype.indexOf.call(over.parentElement.children, li);

  //     const hoverBoundingRect = ref.current.getBoundingClientRect();
  //     const hoverMiddleY =
  //       (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  //     const clientOffset = monitor.getClientOffset();
  //     const hoverClientY = (clientOffset as any).y - hoverBoundingRect.top;

  //     // Dragging downwards
  //     // if (hoverClientY < hoverMiddleY) {
  //     //   return;
  //     // }

  //     // // Dragging upwards
  //     // if (hoverClientY > hoverMiddleY) {
  //     //   return;
  //     // }

  //     const overIndex = getIndex(over);
  //     const underIndex = getIndex(under);
  //     const underPadding = parseInt(
  //       getComputedStyle(
  //         under.querySelector(".item-content")
  //       ).paddingLeft.replace("px", ""),
  //       10
  //     );

  //     if (overIndex > underIndex) {
  //       under.before(over);
  //       over.querySelector(".item-content").style.paddingLeft =
  //         underPadding + "px";
  //     } else {
  //       over.before(under);
  //       over.querySelector(".item-content").style.paddingLeft =
  //         underPadding + 10 + "px";
  //     }

  //     // ref.current.before(item.ref.current);
  //   }
  // });
  const [drag] = useDragMove({
    onDragLeft: () => console.log("Left"),
    onDragRight: () => console.log("Right"),
    onDragUp: () => {
      (ref.current.previousSibling as any).before(ref.current);
    },
    onDragDown: () => {
      ref.current.nextSibling.after(ref.current);
    }
  });

  drag(ref);
  return (
    <div id={data.id} ref={ref}>
      {children}
    </div>
  );
}
