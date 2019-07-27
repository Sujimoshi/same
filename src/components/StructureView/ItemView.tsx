import React from "react";
import { ItemWrapper, ItemContent, ActionIcon, ActionsWrapper } from "./styled";
import { Node, NodeType, ComponentConfig } from "@same/configurator";
import Row from "../grid/Row";
import Col from "../grid/Col";
import DragAndDrop from "./DragAndDrop";

export interface Props {
  node: Node;
  level: number;
  onRemove: (node: Node) => void;
  onFocus: (node: Node) => void;
  onCreate: (node: Node) => void;
  onDrop: (
    type: "before" | "into" | "after",
    what: Node | ComponentConfig
  ) => void;
  focus?: boolean;
}

export default function ItemView({
  level,
  node,
  onCreate,
  onRemove,
  onFocus,
  focus,
  onDrop
}: Props) {
  return (
    <DragAndDrop data={node} onDrop={onDrop}>
      <ItemWrapper onClick={() => onFocus(node)} focus={focus}>
        <ItemContent level={level}>
          <Row>
            <Col>
              {node.type === NodeType.Text
                ? `"${node.value}"`
                : `<${node.tag}>`}
            </Col>
            <Col size="auto">
              <ActionsWrapper>
                {node.type === NodeType.Element && (
                  <ActionIcon onClick={onCreate}>+</ActionIcon>
                )}
                {level !== 0 && <ActionIcon onClick={onRemove}>x</ActionIcon>}
              </ActionsWrapper>
            </Col>
          </Row>
        </ItemContent>
      </ItemWrapper>
    </DragAndDrop>
  );
}
