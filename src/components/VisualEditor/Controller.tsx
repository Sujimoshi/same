import React, { Component, MouseEvent } from "react";
import { Dictionary } from "underscore";
import { ComponentConfig, Node } from "@same/configurator";
import { getPos, Pos, getSizeParts } from "@same/utils/helpers";
import FocusOutline from "./FocusOutline";
import { connect } from "react-redux";
import { RootStore, Mapper } from "same";
import {
  getFocusedComponent,
  getComponents,
  getFocusedNode
} from "@same/store/project/selectors";
import { focusNode } from "@same/actions/node";
import { setStyles } from "@same/actions/styles";
import NodeRenderer from "./NodeRenderer";
import OutlineContainer from "./Outline";

export interface Props {
  component: ComponentConfig;
  allComponents: Dictionary<ComponentConfig>;
  focusedNode: Node;
  onFocus: (id: Node) => void;
  setStyles: typeof setStyles;
}

export class Controller extends Component<Props> {
  focusRef?: HTMLElement = null;

  hoverRef?: HTMLElement = null;

  setFocusRef = (ref: HTMLElement) => {
    if (ref && ref !== this.focusRef) {
      this.focusRef = ref;
      this.forceUpdate();
    }
  };

  onNodeMouseOver = (e: MouseEvent) => {
    e.stopPropagation();
    this.hoverRef = e.target as HTMLElement;
    this.forceUpdate();
  };

  onNodeClick = (node: Node, e: MouseEvent) => {
    e.stopPropagation();
    e.persist();
    this.props.onFocus(node);
    this.setFocusRef(e.target as HTMLElement);
  };

  renderNode = (node: Node) => {
    const { allComponents, focusedNode } = this.props;
    const styledNode = node.ref ? allComponents[node.ref].node : node;
    const focusedId = focusedNode && focusedNode.id;
    return (
      <NodeRenderer
        key={node.id}
        node={node}
        styledNode={styledNode}
        setFocusRef={node.id === focusedId && this.setFocusRef}
        onClick={e => this.onNodeClick(node, e)}
        onMouseOver={this.onNodeMouseOver}
      >
        {node.children.length > 0
          ? node.children.map(this.renderNode)
          : node.value}
      </NodeRenderer>
    );
  };

  render() {
    const { component, setStyles, focusedNode } = this.props;

    return (
      <>
        {component ? this.renderNode(component.node) : "Open file..."}
        {this.hoverRef && <OutlineContainer element={this.hoverRef} />}
        {this.focusRef && (
          <FocusOutline
            setStyles={(cb: Mapper) => setStyles(component, focusedNode, cb)}
            focusRef={this.focusRef}
          />
        )}
      </>
    );
  }
}

export default connect(
  (state: RootStore) => ({
    component: getFocusedComponent(state),
    allComponents: getComponents(state),
    focusedNode: getFocusedNode(state)
  }),
  { onFocus: focusNode, setStyles }
)(Controller);
