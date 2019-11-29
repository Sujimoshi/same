import { useState, useCallback, useEffect, useMemo } from "react";
import { throttle, noop } from "underscore";
import { XYCoord } from "dnd-core";
import { useDrag } from "react-dnd";

const getRectDiff = (pos1: any, pos2: any): XYCoord => ({
  x: pos1.x - pos2.x,
  y: pos1.y - pos2.y
});

export const useThrottle = <T extends Function>(fn: T, ms = 16) => {
  const throttledFn = useMemo(() => throttle(fn, ms), [fn, ms]);
  useEffect(() => () => throttledFn.cancel(), [throttledFn]);
  return throttledFn;
};

let position: XYCoord = null;

export interface Options {
  onDragUp?: () => void;
  onDragDown?: () => void;
  onDragLeft?: () => void;
  onDragRight?: () => void;
  item: { [key: string]: any; type: string };
}

const useDragMove = ({
  item,
  onDragUp = noop,
  onDragDown = noop,
  onDragLeft = noop,
  onDragRight = noop
}: Options) => {
  const [, drag] = useDrag({
    item,
    begin: () => {
      position = null;
      document.addEventListener("drag", throttledHandler, false);
    },
    end: () => {
      document.removeEventListener("drag", throttledHandler, false);
      position = null;
    }
  });

  const handler = useCallback(
    // eslint-disable-next-line complexity
    (event: DragEvent) => {
      const currentPosition = { x: event.clientX, y: event.clientY };
      if (currentPosition.x === 0 || currentPosition.y === 0) return;
      if (!position) return (position = currentPosition);
      const diff = getRectDiff(currentPosition, position);
      if (diff.x > 9) {
        position = { ...position, x: currentPosition.x };
        console.log("inner drag right");
        onDragRight();
      }
      if (diff.x < -9) {
        position = { ...position, x: currentPosition.x };
        onDragLeft();
      }
      if (diff.y > 9) {
        position = { ...position, y: currentPosition.y };
        onDragDown();
      }
      if (diff.y < -9) {
        position = { ...position, y: currentPosition.y };
        onDragUp();
      }
    },
    [position]
  );

  const throttledHandler = useThrottle(handler, 100);

  return [drag];
};

export default useDragMove;
