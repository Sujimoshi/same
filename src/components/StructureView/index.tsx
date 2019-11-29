import React, { Component, ReactNode, Fragment } from "react";
import { Ul, Li, StructureEditorWrapper } from "./styled";
import { RootStore } from "same";
import { removeNode, insertNode } from "@same/store/project/actions";
import { Node, ComponentConfig, isStyled, NodeType } from "@same/configurator";
import {
  getFocusedComponent,
  getHoveredNodeId,
  getFocusedNodeId
} from "@same/store/editor/selectors";
import {
  focusNode,
  createAndAppend,
  mountNode,
  setHoveredNode,
  saveNodeAsComponent
} from "@same/actions/node";
import Sortable from "./Sortable";
import { connect } from "react-redux";
import ListItem from "../ListItem";

interface Props {
  component?: ComponentConfig;
  focusedNodeId?: string;
  hoveredNodeId?: string;
  onFocus?: typeof focusNode;
  onRemove?: typeof removeNode;
  onCreate: typeof createAndAppend;
  onDrop: typeof mountNode;
  onHover: (id: string) => void;
  onSave: (component: ComponentConfig, node: Node, newName: string) => void;
}

interface State {
  nodeCreation: Node;
  creationType: NodeType;
  nodeSaving: Node;
  tree: Node;
}

export class StructureView extends Component<Props, State> {
  static getTree = (component?: ComponentConfig) =>
    component ? JSON.parse(JSON.stringify(component.node)) : null;

  state: State = {
    tree: StructureView.getTree(this.props.component),
    nodeSaving: null,
    nodeCreation: null,
    creationType: null
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.component !== this.props.component) {
      this.setState({
        tree: StructureView.getTree(this.props.component)
      });
    }
  }

  onCreate = (node: Node, type: NodeType) => {
    this.setState({ nodeCreation: node, creationType: type });
  };

  onCreateFinish = (value: string) => {
    if (value) {
      this.props.onCreate(
        this.props.component,
        this.state.nodeCreation,
        this.state.creationType,
        value
      );
    }
    this.setState({ nodeCreation: null, creationType: null });
  };

  onSave = (node: Node) => {
    this.setState({ nodeSaving: node });
  };

  onSaveFinish = (value: string) => {
    this.props.onSave(this.props.component, this.state.nodeSaving, value);
    this.setState({ nodeSaving: null });
  };

  getTitle(component: ComponentConfig, node: Node) {
    if (node.value) return `"${node.value}"`;
    else if (isStyled(component)) {
      return `${component.name}`;
    } else {
      return `${node.tag || component.file}`;
    }
  }

  getIcon(node: Node) {
    if (!node.tag) {
      return "layer-group";
    }
    if (node.type === NodeType.Text) {
      return "text";
    } else if (node.type === NodeType.Element) {
      return "code";
    }
  }

  renderCreateItem = (level: number = 0) => (
    <ListItem onEditFinish={this.onCreateFinish} edit level={level}>
      {this.state.creationType === NodeType.Element ? "div" : "Text"}
    </ListItem>
  );

  getActions = (node: Node) => ({
    ...(node.tag && {
      ...(!node.value && {
        text: () => this.onCreate(node, NodeType.Text),
        "plus-circle": () => this.onCreate(node, NodeType.Element),
        ...(!node.ref && {
          save: () => this.onSave(node)
        })
      }),
      trash: () => this.props.onRemove(this.props.component, node)
    })
  });

  renderHeader = (node: Node, level: number) => {
    const { nodeSaving } = this.state;
    const {
      component,
      focusedNodeId,
      hoveredNodeId,
      onDrop,
      onFocus,
      onHover
    } = this.props;
    return (
      <Sortable
        key={node.id}
        tree={this.state.tree}
        onDrop={(type, drop) =>
          log(drop) && onDrop(component, node, type, drop)
        }
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

  renderChildrens = (node: Node, level: number): ReactNode => {
    const childrens = node.children || [];
    return childrens.length
      ? childrens.map(el => this.renderNode(el, level + 1))
      : null;
  };

  renderNode = (node: Node, level: number = 0) => {
    const creation =
      this.state.nodeCreation && this.state.nodeCreation.id === node.id;
    return (
      <Fragment key={node.id}>
        {this.renderHeader(node, level)}
        {creation && this.renderCreateItem(level + 1)}
        {this.renderChildrens(node, level)}
      </Fragment>
    );
  };

  render() {
    const { tree } = this.state;
    if (!tree) return "No focused component";
    return <Ul>{this.renderNode(tree)}</Ul>;
  }
}

export default connect(
  (store: RootStore): Partial<Props> => ({
    component: getFocusedComponent(store),
    focusedNodeId: getFocusedNodeId(store),
    hoveredNodeId: getHoveredNodeId(store)
  }),
  {
    onFocus: focusNode,
    onRemove: removeNode,
    onInsert: insertNode,
    onCreate: createAndAppend,
    onDrop: mountNode,
    onHover: setHoveredNode,
    onSave: saveNodeAsComponent
  }
)(StructureView);
