import styled from "@emotion/styled";
import React from "react";

export const Row = styled.div(props => ({
  width: "100%",
  display: "flex",
  boxSizing: "border-box",
  "flex-wrap": "wrap",
  ...props.styled
}));

export default function Example() {
  return <Row styled={{ height: "5rem", background: "gray" }} />;
}
