import React, { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import { throttle, Dictionary } from "underscore";
import { ComponentConfig } from "@same/configurator";
import NodeRenderer from "./NodeRenderer";
import { useDrag } from "react-dnd";

export const Resizer = styled.span((props: any) => ({
  marginRight: "-2px",
  pointerEvents: "initial",
  marginLeft: "auto",
  cursor: "col-resize",
  width: "3px",
  height: "100%",
  ...props.styled
}));

export const Outline = styled.div((props: any) => ({
  display: "flex",
  pointerEvents: "none",
  position: "absolute",
  borderRadius: "2px",
  top: 0,
  left: 0,
  width: "10px",
  height: "10px",
  border: "1px solid lightblue",
  boxSizing: "border-box",
  ...props.styled
}));

export const FocusOutline = styled(Outline)((props: any) => ({
  borderColor: "red",
  ...props.styled
}));

export interface Props {
  component: ComponentConfig;
  allComponents: Dictionary<ComponentConfig>;
  focusedNodeId: string;
  onFocus: (id: string) => void;
}

export default function Controller({
  component,
  allComponents,
  focusedNodeId,
  onFocus
}: Props) {
  const [pos, setPos] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [focusPos, setFocusPos] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const root = useRef<HTMLDivElement>();
  const [cords, dragRef] = useDrag({
    item: { type: "resize", data: "any" },
    collect: monitor => {
      return {
        dif: monitor.getDifferenceFromInitialOffset(),

        off: monitor.getClientOffset(),
        m: monitor.getInitialClientOffset(),

        i: monitor.getInitialSourceClientOffset(),
        s: monitor.getSourceClientOffset()
      };
    }
  });
  console.log(cords);

  const onClick = throttle(
    ({ target }: any) => {
      if (!target) return;
      onFocus(target.getAttribute("data-id"));
    },
    100,
    { trailing: false }
  );

  const onMouseOver = throttle(({ target }: any) => {
    if (!target) return;
    setPos({
      x: target.offsetLeft,
      y: target.offsetTop,
      w: target.offsetWidth,
      h: target.offsetHeight
    });
  }, 25);

  useEffect(() => {
    if (!root.current) return;
    const nodes = root.current.querySelectorAll("[data-id]");

    nodes.forEach((node: any) => {
      if (node.getAttribute("data-id") === focusedNodeId)
        setFocusPos({
          x: node.offsetLeft,
          y: node.offsetTop,
          w: node.offsetWidth,
          h: node.offsetHeight
        });
    });

    nodes.forEach(el => {
      el.addEventListener("mouseover", onMouseOver);
      el.addEventListener("click", onClick, true);
    });

    return () => {
      nodes.forEach(el => {
        el.removeEventListener("mouseover", onMouseOver);
        el.removeEventListener("click", onClick, true);
      });
    };
  }, [component, allComponents, focusedNodeId]);

  return (
    <>
      {component ? (
        <div ref={root}>
          <NodeRenderer node={component.node} allComponents={allComponents} />
        </div>
      ) : (
        "Open file..."
      )}
      <Outline
        styled={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          width: `${pos.w}px`,
          height: `${pos.h}px`
        }}
      />
      <FocusOutline
        styled={{
          transform: `translate(${focusPos.x}px, ${focusPos.y}px)`,
          width: `${focusPos.w}px`,
          height: `${focusPos.h}px`
        }}
      >
        <Resizer ref={dragRef} />
      </FocusOutline>
    </>
  );
}
