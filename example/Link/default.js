import React from "react";
import { Item } from "./index";

export default function DefaultLink() {
  return (
    <ul key="list">
      <Item key="one">Header</Item>
      <Item key="two">Main</Item>
      <Item key="three">Footer</Item>
    </ul>
  );
}
