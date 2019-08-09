import React from "react";
import styled from "@emotion/styled";
import { getPos, getSizeParts } from "@same/utils/helpers";
import { Outline } from "./styled";

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

export default function OutlineContainer({ element }: Props) {
  const pos = getPos(element);
  const sizes = {
    margin: getSizeParts(element, "margin"),
    padding: getSizeParts(element, "padding"),
    border: getSizeParts(element, "border")
  };
  const isNoOutline = Object.values(sizes).every(value =>
    Object.values(value).every(value => !value)
  );

  return isNoOutline ? (
    <Outline
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        width: `${pos.w}px`,
        height: `${pos.h}px`
      }}
    />
  ) : (
    <Outline
      style={{
        ...getBorderProps(sizes.margin),
        borderColor: colors.margin,
        transform: `translate(${pos.x - sizes.margin.left}px, ${pos.y -
          sizes.margin.top}px)`,
        width: `${pos.w + sizes.margin.right + sizes.margin.left}px`,
        height: `${pos.h + sizes.margin.top + sizes.margin.bottom}px`
      }}
    >
      <Outline
        style={{
          ...getBorderProps(sizes.border),
          borderColor: colors.border
        }}
      >
        <Outline
          style={{
            ...getBorderProps(sizes.padding),
            borderColor: colors.padding
          }}
        />
      </Outline>
    </Outline>
  );
}
