import React, { Component } from "react";
import { Ul, Li } from "./styled";
import { RootStore } from "same";
import { removeNode, insertNode } from "@same/store/project/actions";
import { focusNode, createAndAppend, mountNode } from "@same/actions/node";
import {
  getFocusedNode,
  getFocusedComponent
} from "@same/store/project/selectors";
import {
  Node,
  ComponentConfig,
  NodeType,
  ComponentType,
  isElementNode,
  isStyled
} from "@same/configurator";
import { connect } from "react-redux";
import DragAndDrop from "./DragAndDrop";
import ListItem from "../ListItem";

interface Props {
  component?: ComponentConfig;
  focus?: Node;
  onFocus?: typeof focusNode;
  onRemove?: typeof removeNode;
  onCreate: typeof createAndAppend;
  onDrop: typeof mountNode;
}

export class StructureView extends Component<Props> {
  getTitle(component: ComponentConfig, node: Node) {
    if (node.type === NodeType.Text) return `"${node.value}"`;
    else if (isStyled(component)) {
      return `<${component.name}>`;
    } else {
      return `<${node.tag || "root"}>`;
    }
  }
  renderHeader = (node: Node, level: number) => {
    const {
      component,
      focus,
      onDrop,
      onCreate,
      onRemove,
      onFocus
    } = this.props;
    return (
      <DragAndDrop
        onDrop={(type, what) => onDrop(component, node, type, what)}
        data={node}
      >
        <ListItem
          level={level}
          focus={focus && node.id === focus.id}
          onClick={() => onFocus(node)}
          actions={
            level !== 0 && {
              ...(isElementNode(node) && {
                plus: () => onCreate(component, node)
              }),
              times: () => onRemove(component, node)
            }
          }
        >
          {this.getTitle(component, node)}
        </ListItem>
      </DragAndDrop>
    );
  };

  renderChildrens = (node: Node, level: number) => {
    const childrens = node.children || [];
    return childrens.length ? (
      <Ul>
        {childrens.map(el => (
          <Li key={el.id}>{this.renderNode(el, level + 1)}</Li>
        ))}
      </Ul>
    ) : null;
  };

  renderNode = (node: Node, level: number = 0) => {
    return (
      <div className="tree-view">
        {this.renderHeader(node, level)}
        {this.renderChildrens(node, level)}
      </div>
    );
  };

  render() {
    const { component } = this.props;
    if (!component) return "Open file";
    return this.renderNode(component.node);
  }
}

export default connect(
  (store: RootStore) => ({
    component: getFocusedComponent(store),
    focus: getFocusedNode(store)
  }),
  {
    onFocus: focusNode,
    onRemove: removeNode,
    onInsert: insertNode,
    onCreate: createAndAppend,
    onDrop: mountNode
  }
)(StructureView);
