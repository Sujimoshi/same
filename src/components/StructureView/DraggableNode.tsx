import React, { ReactNode } from "react";
import useDraggable, { DragState } from "../hooks/useDraggable";
import styled from "@emotion/styled";
import { useDrop } from "react-dnd";

const DraggableDiv = styled.div(props => ({
  ...(!props.children
    ? {
        marginTop: "-.5rem",
        height: ".5rem"
      }
    : {})
}));

export interface Props<T> {
  node: T;
  styled?: any;
  onDrop: (data: any) => void;
  children?: ReactNode;
  onDragStateChange?: (dragState: DragState) => void;
}

export default function DruggableNode<T>(props: Props<T>) {
  const dnd = useDraggable(props.node);
  props.onDragStateChange && props.onDragStateChange(dnd.dragState);
  return (
    <DraggableDiv
      data-drag={dnd.dragState}
      draggable
      onDragEnd={dnd.onDragEnd}
      onDragOver={dnd.onDragOver}
      onDragStart={dnd.onDragStart}
      onDragEnter={dnd.onDragEnter}
      onDragLeave={dnd.onDragLeave}
    >
      {props.children}
    </DraggableDiv>
  );
}
