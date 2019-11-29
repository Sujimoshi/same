import { ComponentConfig, Node, isStyled } from "@same/configurator";
import { Mapper, ObjectMapper } from "same";
import ListItem from "@same/components/ListItem";
import React, { ReactNode, Component } from "react";
import Sortable from "@same/components/StructureView/Sortable";

export interface Props {
  children: ReactNode;
  component: ComponentConfig;
}

export interface State {
  tree: Node;
}

export default class Sidebar extends Component<Props, State> {
  state = {
    tree: this.props.component.node
  };

  setTree = (mapper: ObjectMapper<Node>) => {
    this.setState({ tree: mapper(this.state.tree) as Node });
  };

  onDrop = (node: Node, direction: string) => {};

  getTitle(component: ComponentConfig, node: Node) {
    if (node.value) return `"${node.value}"`;
    else if (isStyled(component)) {
      return component.name;
    } else {
      return node.tag;
    }
  }

  renderNode = (node: Node, level: number) => {
    return (
      <Sortable
        key={node.id}
        onChange={tree => this.setState({ tree })}
        data={node}
      >
        <ListItem
          level={level}
          disabled={!node.tag}
          icon={this.getIcon(node)}
          edit={nodeSaving && nodeSaving.id === node.id}
          focus={focusedNodeId && node.id === focusedNodeId}
          hover={hoveredNodeId && node.id === hoveredNodeId}
          onClick={() => onFocus(node)}
          onEditFinish={this.onSaveFinish}
          // onMouseOut={() => onHover(null)}
          // onMouseOver={() => onHover(node.id)}
          actions={this.getActions(node)}
        >
          {this.getTitle(component, node)}
        </ListItem>
      </Sortable>
    );
  };

  renderChildrens = (childs: Node[], level: number = 1): ReactNode => {
    return childs.length
      ? childs.map(el => this.renderNode(el, level + 1))
      : null;
  };

  renderRoot() {
    const { tree } = this.state;
    return (
      <>
        <ListItem disabled icon="code-merge">
          root
        </ListItem>
        {this.renderChildrens(tree.children)}
      </>
    );
  }

  render() {
    return this.renderRoot();
  }
}
