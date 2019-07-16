import React from "react";
import ElementList from "./ElementList";
import { connect } from "react-redux";
import { RootStore } from "same";
import { ExpressionType, Node, Element } from "@same/parser/structure";
import { getFocusedNode } from "@same/store/editor/selectors";

export interface Props {
  focus?: Node;
}

export function PropsEditor({ focus }: Props) {
  if (!focus) return <div>No focused element</div>;
  switch (focus.type) {
    case ExpressionType.Element:
      return <ElementList node={focus as Element} />;
    case ExpressionType.StyledComponent:
      return <ElementList node={focus as Element} />;
    default:
      return <div>Unknown element type</div>;
  }
}

export default connect((store: RootStore) => ({
  focus: getFocusedNode(store)
}))(PropsEditor);
