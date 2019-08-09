import styled from "@emotion/styled";
import { JustifyContentProperty, AlignItemsProperty } from "csstype";

export interface Props {
  size?: number | string;
  grow?: number;
  align?: JustifyContentProperty;
  justify?: AlignItemsProperty;
  styled: CSSStyleDeclaration;
}

export default styled.div(({ justify, size, grow, align, styled }: Props) => {
  return {
    alignItems: justify,
    justifyContent: align,
    display: "flex",
    flexDirection: "column",
    flexGrow: grow !== undefined ? grow : size ? 0 : 1,
    flexBasis: size || 0,
    maxWidth: size || "100%",
    minHeight: "1px",
    ...styled
  };
});
