import { ComponentConfig, ComponentType } from "@same/configurator";
import React from "react";
import { ItemWrapper } from "../StructureView/styled";
import { useDrag } from "react-dnd";

export interface Props {
  component: ComponentConfig;
  focus?: boolean;
  onClick: () => void;
}

export default function Item({ component, focus, onClick }: Props) {
  const [, drag] = useDrag({
    item: { data: component, type: "component" }
  });
  return (
    <ItemWrapper
      styled={{ paddingLeft: "4rem" }}
      ref={drag}
      focus={focus}
      onClick={onClick}
    >
      {`${component.name} (${component.node.tag})`}
    </ItemWrapper>
  );
}
