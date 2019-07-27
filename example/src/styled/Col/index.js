import styled from "@emotion/styled";
import React from "react";

export const Col = styled.div(props => ({
  ...props.styled
}));

export default function Example() {
  return <Col />;
}
