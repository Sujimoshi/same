import styled from "@emotion/styled";
import {
  JustifyContentProperty,
  AlignItemsProperty,
  WidthProperty
} from "csstype";

export interface Props {
  align?: AlignItemsProperty;
  height?: string;
  justify?: JustifyContentProperty;
  width?: WidthProperty<"auto">;
  styled?: any;
}

export default styled.div(
  ({ width = "100%", align, justify, height, styled }: Props) => ({
    width,
    height,
    display: "flex",
    boxSizing: "border-box",
    flexWrap: "wrap",
    alignItems: align,
    justifyContent: justify,
    ...styled
  })
);
