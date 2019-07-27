import styled from "@emotion/styled";
import React from "react";

export const Label = styled.label(props => ({
  ...props.styled
}));

export default function Example() {
  return <Label>Label:</Label>;
}
