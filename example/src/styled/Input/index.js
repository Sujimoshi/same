import * as React from "react";
import styled from "@emotion/styled";

export default function Example() {
  return (
    <>
      <Input />
    </>
  );
}

export const Input = styled.input(props => ({
  border: "1px solid gray",
  borderRadius: "5px",
  padding: "5px",
  width: "100%",
  ...props.styled
}));
