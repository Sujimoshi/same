import React from "react";
import styled from "@emotion/styled";
import { useDrag } from "react-dnd";

export const DraggerStyles = styled.div((props: any) => ({
  position: "absolute",
  pointerEvents: "initial",
  background: "red",
  cursor: "grab",
  height: "5px",
  width: "5px",
  borderRadius: "50%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  ...props.styled
}));

export interface Props {
  element: HTMLElement;
}

export default function Dragger({ element }: Props) {
  const [opacity, ref, previewRef] = useDrag({
    item: { type: "visual", data: element },
    collect: monitor => (monitor.isDragging() ? ".4" : "1")
  });
  element.style.opacity = opacity;
  previewRef(element);

  return <DraggerStyles ref={ref} />;
}
