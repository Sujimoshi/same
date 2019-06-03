import React, { useState } from "react";
import { ItemWrapper, ItemContent, ActionIcon } from "./styled";
import { DragState } from "../hooks/useDraggable";
import ASTNode from "@same/parser/ASTNode";
import DruggableNode from "./DraggableNode";

export interface Props {
  node: ASTNode;
  level: number;
  onDropAppend: (data: { [key in DragState]: ASTNode }) => void;
  onDropAfter: (data: { [key in DragState]: ASTNode }) => void;
  onRemove: (node: ASTNode) => void;
  onFocus: (node: ASTNode) => void;
  focus?: boolean;
}

export function ItemView({
  node,
  level,
  onDropAppend,
  onDropAfter,
  onRemove,
  onFocus,
  focus = false
}: Props) {
  const [appendDragState, setAppendDragState] = useState(DragState.Hold);
  const [afterDragState, setAfterDragState] = useState(DragState.Hold);
  return (
    <ItemWrapper
      appendDragState={appendDragState}
      afterDragState={afterDragState}
      onClick={() => onFocus(node)}
      focus={focus}
    >
      <DruggableNode
        node={node}
        onDrop={onDropAppend}
        onDragStateChange={setAppendDragState}
      >
        <ItemContent level={level}>
          {node.title()}
          <ActionIcon onClick={() => onRemove(node)}>x</ActionIcon>
        </ItemContent>
      </DruggableNode>
      <DruggableNode
        node={node}
        onDrop={onDropAfter}
        onDragStateChange={setAfterDragState}
      />
    </ItemWrapper>
  );
}
