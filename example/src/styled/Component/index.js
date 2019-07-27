import styled from "@emotion/styled";
import React from "react";

export const Component = styled.div(props => ({
  some: "any",
  ":hover": {
    some: "why"
  },
  ...(props.focus && {
    some: "bad"
  }),
  ...props.styled
}));

export default function Example() {
  return (
    <Component>
      <Component />
    </Component>
  );
}
