import React, { ReactNode } from "react";
import { useDrag } from "react-dnd";
import ListItem from "../ListItem";
import { DragWrapper } from "@same/styled/Components";
import { ComponentConfig, isStyled } from "@same/configurator";
import { basename } from "path";
import { Dictionary } from "underscore";

export interface Props {
  component: ComponentConfig;
  level: number;
  focus?: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
  onRemove: (componentId: string) => void;
}

const getTitle = (component: ComponentConfig) =>
  isStyled(component)
    ? `${component.name} (${component.node.tag})`
    : basename(component.file, ".js");

export default function ComponentItem({
  focus,
  component,
  level,
  onClick,
  onRemove,
  onDoubleClick
}: Props) {
  const [isDragging, dragRef] = useDrag({
    item: { type: "components", data: component },
    collect: monitor => monitor.isDragging()
  });

  return (
    <DragWrapper ref={dragRef} dragging={isDragging}>
      <ListItem
        key={component.id}
        level={level}
        icon={isStyled(component) ? "palette" : "layer-group"}
        focus={focus}
        onDoubleClick={onDoubleClick}
        onClick={onClick}
        actions={{
          trash: () => onRemove(component.id)
        }}
      >
        {getTitle(component)}
      </ListItem>
    </DragWrapper>
  );
}
