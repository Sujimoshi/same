import styled from "@emotion/styled";

export default styled.div(
  ({ width = "100%", align, justify, height, styled, padding }: any) => ({
    width,
    height,
    display: "flex",
    boxSizing: "border-box",
    padding: padding || "",
    flexWrap: "wrap",
    alignItems: align,
    justifyContent: justify,
    ...styled
  })
);
