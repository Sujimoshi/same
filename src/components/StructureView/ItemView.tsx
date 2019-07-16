import React, { useState } from "react";
import { ItemWrapper, ItemContent, ActionIcon } from "./styled";
import { DragState } from "../hooks/useDraggable";
import DruggableNode from "./DraggableNode";
import {
  Node,
  ExpressionType,
  TextNode,
  Element,
  Exportable
} from "@same/parser/structure";

export interface Props {
  node: Node;
  level: number;
  onDropAppend: (data: { [key in DragState]: Node }) => void;
  onDropAfter: (data: { [key in DragState]: Node }) => void;
  onDropBefore: (data: { [key in DragState]: Node }) => void;
  onRemove: (node: Node) => void;
  onFocus: (node: Node) => void;
  focus?: boolean;
}

export function ItemView({
  node,
  level,
  onDropAppend,
  onDropAfter,
  onDropBefore,
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
        onDrop={onDropBefore}
        onDragStateChange={setAfterDragState}
      />
      <DruggableNode
        node={node}
        onDrop={onDropAppend}
        onDragStateChange={setAppendDragState}
      >
        <ItemContent level={level}>
          {node.type === ExpressionType.TextNode
            ? (node as TextNode).value
            : `<${(node as any).name || (node as Element).tag}>`}
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
