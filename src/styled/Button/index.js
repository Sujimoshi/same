import styled from "@emotion/styled";
import React from "react";

export const Button = styled.button(props => ({
  border: "1px solid gray",
  width: "100%",
  lineHeight: "1.4rem",
  borderRadius: ".5rem",
  padding: ".5rem",
  ...props.styled
}));

export default function Example() {
  return <Button>Button</Button>;
}
