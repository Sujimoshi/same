import React, { Fragment, Component } from "react";
import { Ul, Li } from "./styled";
import { RootStore } from "same";
import ItemView from "./ItemView";
import { removeNode, insertNode } from "@same/store/project/actions";
import { focusNode, createAndAppend, mountNode } from "@same/actions/node";
import {
  getFocusedNode,
  getFocusedComponent
} from "@same/store/project/selectors";
import { Node, ComponentConfig } from "@same/configurator";
import { connect } from "react-redux";

interface Props {
  component?: ComponentConfig;
  focus?: Node;
  onFocus?: typeof focusNode;
  onRemove?: typeof removeNode;
  onCreate: typeof createAndAppend;
  onDrop: typeof mountNode;
}

export class StructureView extends Component<Props> {
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
      <ItemView
        node={node}
        focus={focus && node.id === focus.id}
        level={level}
        onCreate={() => onCreate(component, node)}
        onRemove={() => onRemove(component, node)}
        onFocus={() => onFocus(node)}
        onDrop={(type, what) => onDrop(component, node, type, what)}
      />
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
    return <Fragment>{this.renderNode(component.node)}</Fragment>;
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
