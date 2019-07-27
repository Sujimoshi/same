import React from "react";
import { connect } from "react-redux";
import { RootStore } from "same";
import {
  getFocusedNode,
  getFocusedComponent
} from "@same/store/project/selectors";
import {
  Node,
  NodeType,
  ComponentConfig,
  ComponentType,
  isPure,
  isStyled,
  isElementNode
} from "@same/configurator";
import { getReferenceComponent } from "../../store/project/selectors";
import { setStyles } from "@same/actions/styles";
import ObjectView from "./ObjectView";

export interface Props {
  focusedNode?: Node;
  referenceComponent?: ComponentConfig;
  focusedComponent: ComponentConfig;
  onChange: typeof setStyles;
}

export function PropsEditor({
  focusedNode,
  referenceComponent,
  focusedComponent,
  onChange
}: Props) {
  if (!focusedNode || !focusedNode.tag) return <div>No focused element</div>;
  if (focusedNode.type === NodeType.Text)
    return <div>Unknown element type</div>;

  const styledComponent = isStyled(focusedComponent)
    ? focusedComponent
    : referenceComponent;
  return (
    <>
      {isElementNode(focusedNode) && (
        <ObjectView
          attributes={focusedNode.styles}
          title="styles.inline"
          onChange={action => onChange(focusedComponent, focusedNode, action)}
        />
      )}
      {styledComponent && isStyled(styledComponent) && (
        <ObjectView
          title="styles"
          attributes={styledComponent.node.styles || {}}
          onChange={action =>
            onChange(styledComponent, styledComponent.node, action)
          }
        />
      )}
    </>
  );
}

export default connect(
  (state: RootStore) => ({
    focusedNode: getFocusedNode(state),
    focusedComponent: getFocusedComponent(state),
    referenceComponent: getReferenceComponent(state)
  }),
  {
    onChange: setStyles
  }
)(PropsEditor);
