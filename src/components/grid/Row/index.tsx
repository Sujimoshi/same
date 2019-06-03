import styled from "@emotion/styled";

export interface Props {
  align?: "start" | "center" | "end";
  height?: string;
  justify?: "start" | "center" | "end" | "around" | "between";
}

export default styled.div(({ align, height }: Props) => ({
  height,
  display: "flex",
  boxSizing: "border-box",
  flexWrap: "wrap",
  alignItems: align
}));
