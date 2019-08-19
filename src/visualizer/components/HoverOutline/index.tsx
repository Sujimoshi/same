import React from "react";
import styled from "@emotion/styled";
import { getPos, getSizeParts } from "@same/utils/helpers";

export const Outline = styled.div((props: any) => ({
  display: "flex",
  pointerEvents: "none",
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  border: "1px solid lightblue",
  boxSizing: "border-box",
  ...props.styled
}));

export type OutlineType = "padding" | "margin" | "border";

export interface Props {
  element: HTMLElement;
}

const colors = {
  margin: "rgba(185, 117, 59, .5)",
  border: "rgba(133, 133, 189, .5)",
  padding: "rgba(152, 189, 133, .5)"
};

const getBorderProps = (sizes: any) => ({
  borderTopWidth: `${sizes.top}px`,
  borderRightWidth: `${sizes.right}px`,
  borderLeftWidth: `${sizes.left}px`,
  borderBottomWidth: `${sizes.bottom}px`
});

export default function HoverOutline({ element }: Props) {
  if (!element) return null;
  const pos = getPos(element);
  const sizes = {
    margin: getSizeParts(element, "margin"),
    padding: getSizeParts(element, "padding"),
    border: getSizeParts(element, "border")
  };
  const isNoOutline = Object.values(sizes).every(value =>
    Object.values(value).every(value => !value)
  );

  // return isNoOutline ? (
  //   <Outline
  //     style={{
  //       transform: `translate(${pos.x}px, ${pos.y}px)`,
  //       width: `${pos.w}px`,
  //       height: `${pos.h}px`
  //     }}
  //   />
  // ) : (
  //   <Outline
  //     style={{
  //       ...getBorderProps(sizes.margin),
  //       borderColor: colors.margin,
  //       transform: `translate(${pos.x - sizes.margin.left}px, ${pos.y -
  //         sizes.margin.top}px)`,
  //       width: `${pos.w + sizes.margin.right + sizes.margin.left}px`,
  //       height: `${pos.h + sizes.margin.top + sizes.margin.bottom}px`
  //     }}
  //   >
  //     <Outline
  //       style={{
  //         ...getBorderProps(sizes.border),
  //         borderColor: colors.border
  //       }}
  //     >
  //       <Outline
  //         style={{
  //           ...getBorderProps(sizes.padding),
  //           borderColor: colors.padding
  //         }}
  //       />
  //     </Outline>
  //   </Outline>
  // );
  return (
    <Outline
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        width: `${pos.w}px`,
        height: `${pos.h}px`
      }}
    />
  );
}
