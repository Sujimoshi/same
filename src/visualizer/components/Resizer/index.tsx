import React from "react";
import styled from "@emotion/styled";
import useResizer from "@same/hooks/resizer";

export const ResizerStyles = styled.span((props: any) => ({
  position: "absolute",
  [props.position]: "-2px",
  pointerEvents: "initial",
  background: "red",
  ...(props.type === "width" && {
    cursor: "col-resize",
    maxHeight: "10px",
    height: "50%",
    width: "3px",
    top: "50%",
    transform: "translateY(-50%)"
  }),
  ...(props.type === "height" && {
    cursor: "row-resize",
    maxWidth: "10px",
    width: "50%",
    height: "3px",
    left: "50%",
    transform: "translateX(-50%)"
  }),
  ...props.styled
}));

export interface Props {
  element: HTMLElement;
  position: "top" | "bottom" | "left" | "right";
  onStart?: (type: "width" | "height") => void;
  onMove?: (type: "width" | "height", size: number) => void;
  onEnd?: (type: "width" | "height") => void;
}

export default function Resizer({
  element,
  position,
  onStart,
  onMove,
  onEnd
}: Props) {
  const [, onMouseDown] = useResizer({
    element,
    position,
    onStart,
    onMove,
    onEnd
  });
  const type = position === "left" || position === "right" ? "width" : "height";

  return (
    <ResizerStyles type={type} position={position} onMouseDown={onMouseDown} />
  );
}
