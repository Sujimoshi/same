import styled from "@emotion/styled";
import React from "react";

export const Input = styled.input(props => ({
  width: "100%",
  lineHeight: "1.4rem",
  border: "1px solid gray",
  padding: ".5rem",
  borderRadius: ".5rem",
  ...props.styled
}));

export default function Example() {
  return <Input />;
}
