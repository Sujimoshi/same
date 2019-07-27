import styled from "@emotion/styled";
import React from "react";

export const Col = styled.div(props => ({
  position: "relative",
  width: "100%",
  display: "flex",
  flexGrow: "0",
  flexShrink: "0",
  maxWidth: "100%",
  ...props.styled
}));

export default function Example() {
  return <Col styled={{ backgroundColor: "gray", height: "2rem" }} />;
}
