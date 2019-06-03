import {
  useState,
  Dispatch,
  SetStateAction,
  DragEvent,
  EventHandler
} from "react";
import { Draggable } from "./useDraggable";

export enum DragState {
  Under = "under",
  Over = "over",
  Hold = "hold"
}

export enum DropEffect {
  Copy = "copy",
  Move = "move",
  Link = "link",
  None = "none"
}

export type SetDragState = Dispatch<SetStateAction<DragState>>;

export type DragEventHandler = EventHandler<DragEvent<HTMLElement>>;

export interface Draggable<T> {
  onDragStart?: DragEventHandler;
  onDragEnd?: DragEventHandler;
  onDragEnter?: DragEventHandler;
  onDragLeave?: DragEventHandler;
  onDragOver?: DragEventHandler;
  onDrag?: DragEventHandler;
  onDrop?: (cb: (data: { [key in DragState]: T }) => void) => DragEventHandler;
  onDragExit?: DragEventHandler;
  dropEffect?: DropEffect;
  node: T;
  setDragState: SetDragState;
  dragState: DragState;
}

const data = {} as any;

export class DraggableImplementation<T extends any> implements Draggable<T> {
  dropEffect?: DropEffect = DropEffect.None;

  setDragState: Dispatch<SetStateAction<DragState>>;

  dragState: DragState;

  constructor(public node: T) {
    const [dragState, setDragState] = useState<DragState>(DragState.Hold);
    this.dragState = dragState;
    this.setDragState = setDragState;
  }

  onDragStart = (event: DragEvent<HTMLElement>) => {
    event.stopPropagation();
    this.setDragState(DragState.Over);
    data[DragState.Over] = this.node;
  };

  onDragEnd = (event: DragEvent<HTMLElement>) => {
    event.stopPropagation();
    this.setDragState(DragState.Hold);
  };

  onDragEnter = (event: DragEvent<HTMLElement>) => {
    event.stopPropagation();
    this.dragState !== DragState.Over && this.setDragState(DragState.Under);
  };

  onDragLeave = (event: DragEvent<HTMLElement>) => {
    event.stopPropagation();
    this.dragState !== DragState.Over && this.setDragState(DragState.Hold);
  };

  onDragOver = (event: DragEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };

  onDrop = (cb: (data: { [key in DragState]: T }) => void) => (
    event: DragEvent<HTMLElement>
  ) => {
    event.stopPropagation();
    this.setDragState(DragState.Hold);
    data[DragState.Under] = this.node;
    cb(data);
  };
}

export default <T>(node: T) => {
  return new DraggableImplementation(node);
};
