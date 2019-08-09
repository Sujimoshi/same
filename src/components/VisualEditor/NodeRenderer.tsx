import { Node } from "@same/configurator";
import styled from "@emotion/styled";
import React, { ReactNode, MouseEvent, useRef } from "react";
import { useDrop } from "react-dnd";
import { debounce } from "underscore";

export interface Props {
  node: Node;
  styledNode: Node;
  children?: ReactNode;
  setFocusRef?: (el: HTMLElement) => void;
  onClick: (e: MouseEvent) => void;
  onMouseOver: (e: MouseEvent) => void;
}

const Styled = styled.div((props: any) => ({
  ...props.styled
}));

const onHover = (item: any, node: Node, ref: any) => {
  const isText =
    ref.firstChild.nodeName === "#text" && ref.lastChild === ref.firstChild;
  if (
    !isText &&
    !ref.appendedClone &&
    !ref.contains(item.data) &&
    ref !== item.data
  ) {
    ref.appendedClone = item.data.cloneNode(true);
    ref.append(ref.appendedClone);
    ref.removeAppendedClone = debounce((ref: any) => {
      ref.removeChild(ref.appendedClone);
      ref.appendedClone = undefined;
    }, 200);
  } else {
    ref.removeAppendedClone && ref.removeAppendedClone(ref);
  }
};

const onDrop = (item: any, node: Node, ref: HTMLElement) => {
  ref.append(item.data);
};

export default function NodeRenderer({
  onClick,
  onMouseOver,
  node,
  styledNode,
  setFocusRef,
  children
}: Props) {
  const reference = useRef<HTMLElement>();
  const [, ref] = useDrop({
    accept: "visual",
    drop: (item, monitor) => {
      monitor.isOver({ shallow: true }) &&
        onDrop(item, node, reference.current);
    },
    hover: (item, monitor) => {
      monitor.isOver({ shallow: true }) &&
        onHover(item, node, reference.current);
    }
  });

  return (
    <Styled
      ref={(el: HTMLElement) => {
        reference.current = el;
        ref(el);
        setFocusRef && setFocusRef(el);
      }}
      data-id={node.id}
      data-styled={styledNode.id}
      as={styledNode.tag}
      onClick={onClick}
      onMouseOver={onMouseOver}
      {...node.props}
      styled={{ ...styledNode.styles, ...node.styles }}
    >
      {children}
    </Styled>
  );
}
