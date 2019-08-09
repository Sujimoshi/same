import * as React from "react";
import styled from "@emotion/styled";

export default function Example() {
  return (
    <>
      <Button>
        <span></span>
      </Button>
    </>
  );
}

export const Button = styled.button(props => ({
  border: "1px solid gray",
  borderRadius: "5px",
  padding: "5px 10px",
  cursor: "pointer",
  "&:focus": {
    outline: "none"
  },
  "&:active": {
    background: "lightblue"
  },
  ...props.styled
}));
