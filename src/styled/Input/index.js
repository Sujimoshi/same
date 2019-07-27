import styled from "@emotion/styled";
import React from "react";

export const Input = styled.input(props => ({
  width: "100%",
  border: "1px solid grey",
  borderRadius: ".5rem",
  padding: ".5rem",
  lineHeight: "1.4rem",
  ...props.styled
}));

export default function Example() {
  return <Input styled={{ background: "red" }} />;
}
