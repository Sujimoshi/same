import styled from "@emotion/styled";
import React from "react";

export const Button = styled.button(props => ({
  width: "100%",
  border: "1px solid gray",
  padding: ".5rem",
  borderRadius: ".5rem",
  lineHeight: "1.4rem",
  cursor: "pointer",
  ...props.styled
}));

export default function Example() {
  return <Button>Button</Button>;
}
