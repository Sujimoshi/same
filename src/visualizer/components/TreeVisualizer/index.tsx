import styled from "@emotion/styled";
import React, { ReactNode } from "react";
import { Node, ComponentConfig } from "@same/configurator";
import { Dictionary, noop } from "underscore";
import { stopPropagation } from "@same/utils/helpers";

export interface Props {
  root: Node;
  components: Dictionary<ComponentConfig>;
  onFocus: (element: HTMLElement) => void;
  onMouseOver: (element: HTMLElement) => void;
  onMouseOut: (element: HTMLElement) => void;
  getElement?: (element: HTMLElement) => void;
}

const Styled = styled.div((props: any) => ({
  ...props.styled
}));

export default function TreeVisualizer({
  components,
  root,
  onFocus,
  onMouseOver,
  onMouseOut,
  getElement = noop
}: Props) {
  const renderChildren = (node: Node): ReactNode =>
    node.children.length
      ? node.children.map(renderNode)
      : node.value
      ? node.value
      : null;

  const renderNode = (node: Node): ReactNode => {
    if (!node.tag) return renderChildren(node);
    const styledNode = node.ref ? components[node.ref].node : node;

    return (
      <Styled
        key={node.id}
        ref={(el: HTMLElement) => getElement && getElement(el)}
        data-id={node.id}
        data-styled={styledNode.id}
        as={styledNode.tag}
        onClick={stopPropagation(e => onFocus(e.target as HTMLElement))}
        onMouseOver={stopPropagation(e => onMouseOver(e.target as HTMLElement))}
        onMouseOut={stopPropagation(e => onMouseOut(e.target as HTMLElement))}
        {...node.props}
        styled={{ ...styledNode.styles, ...node.styles }}
      >
        {renderChildren(node)}
      </Styled>
    );
  };

  return renderNode(root);
}
