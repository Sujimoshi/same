import { useState } from "react";
import { getComputedSize } from "@same/utils/helpers";

export interface Options {
  element: HTMLElement;
  position: "top" | "bottom" | "left" | "right";
  onMove?: (type: "width" | "height", newSize: number) => void;
  onEnd?: (type: "width" | "height") => void;
  onStart?: (type: "width" | "height") => void;
}

const useResizer = ({ element, position, onMove, onEnd, onStart }: Options) => {
  const prop = position === "left" || position === "right" ? "width" : "height";
  const pagePosProp = prop === "width" ? "pageX" : "pageY";
  const [size, setSize] = useState(0);
  let originalSize: number = 0;
  let originalMousePos: number = 0;

  const onMouseUp = (e: MouseEvent): void => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    target.ownerDocument.removeEventListener("mousemove", onMouseMove);
    target.ownerDocument.removeEventListener("mouseup", onMouseUp);
    onEnd && onEnd(prop);
  };

  const onMouseMove = (e: MouseEvent): void => {
    const inverse = position === "left" || position === "top";
    const diff = inverse
      ? originalMousePos - e[pagePosProp]
      : e[pagePosProp] - originalMousePos;
    const newSize = originalSize + diff;
    setSize(newSize);
    onMove && onMove(prop, newSize);
  };

  const onMouseDown = (e: MouseEvent): void => {
    e.preventDefault();
    originalSize = getComputedSize(element, prop);
    setSize(originalSize);

    originalMousePos = e[pagePosProp];
    const target = e.target as HTMLElement;
    target.ownerDocument.addEventListener("mousemove", onMouseMove);
    target.ownerDocument.addEventListener("mouseup", onMouseUp);
    onStart && onStart(prop);
  };

  return [size, onMouseDown];
};

export default useResizer;
