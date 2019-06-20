import React from "react";
import styled from "@emotion/styled";

const Item = styled.li({
  listStyle: "none"
});

export default function Link() {
  return (
    <ul key="some">
      <Item>Header</Item>
      <Item>Main</Item>
      <Item>Footer</Item>
    </ul>
  );
}
