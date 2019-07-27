import React from "react";
import ElementList from "./ElementList";
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
  ComponentType
} from "@same/configurator";
import { getReferenceComponent } from "../../store/project/selectors";
import Collapse from "../Collapse";
import { ItemWrapper } from "../StructureView/styled";
import { setStyles } from "@same/actions/styles";

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
  if (!focusedNode) return <div>No focused element</div>;
  if (focusedNode.type === NodeType.Text)
    return <div>Unknown element type</div>;
  return (
    <>
      <Collapse
        expanded
        key={"inline"}
        renderTitle={() => <ItemWrapper>styles.inline</ItemWrapper>}
      >
        {() => (
          <ElementList
            attributes={focusedNode.styles}
            onChange={onChange.bind(null, focusedComponent, focusedNode, "")}
          />
        )}
      </Collapse>
      {referenceComponent && referenceComponent.type === ComponentType.Styled && (
        <Collapse
          expanded
          key={"default"}
          renderTitle={() => <ItemWrapper>styles</ItemWrapper>}
        >
          {() => (
            <ElementList
              attributes={referenceComponent.node.styles || {}}
              onChange={onChange.bind(
                null,
                referenceComponent,
                referenceComponent.node,
                ""
              )}
            />
          )}
        </Collapse>
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
