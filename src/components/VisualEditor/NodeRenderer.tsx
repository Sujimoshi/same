import { ComponentConfig, Node, isTextNode } from "@same/configurator";
import styled from "@emotion/styled";
import React, { useRef } from "react";
import { Dictionary } from "underscore";

export interface Props {
  allComponents: Dictionary<ComponentConfig>;
  node: Node;
}

const Styled = styled.div((props: any) => ({
  ...props.styled
}));

export default function NodeRenderer({ node, allComponents }: Props) {
  if (isTextNode(node)) return <span data-id={node.id}>{node.value}</span>;
  const styledNode = node.ref ? allComponents[node.ref].node : node;
  return (
    <Styled
      data-id={node.id}
      data-styled={styledNode.id}
      as={styledNode.tag}
      {...node.props}
      styled={{ ...styledNode.styles, ...node.styles }}
    >
      {node.children.length > 0
        ? node.children.map(el => (
            <NodeRenderer key={el.id} allComponents={allComponents} node={el} />
          ))
        : null}
    </Styled>
  );
}
