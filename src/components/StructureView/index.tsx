import React, { Fragment, Component } from "react";
import { DragState } from "../hooks/useDraggable";
import { Ul, Li } from "./styled";
import { withConnect } from "@same/utils/connect";
import { RootStore } from "same";
import { ItemView } from "./ItemView";
import {
  StatelessComponent,
  Node,
  Exports,
  ExpressionType
} from "@same/parser/structure";
import { removeNode, insertNode, placeNode } from "@same/store/editor/actions";
import { focusNode } from "@same/actions/editor";
import { getFocusedNode } from "@same/store/editor/selectors";

interface Props {
  tree?: Node | Node[];
  focus?: Node;
  onFocus?: typeof focusNode;
  onRemove?: typeof removeNode;
  onInsert?: typeof insertNode;
  onPlace?: typeof placeNode;
}

const getTree = (exps: Exports) => {
  if (exps.default) return exps.default.return;
  return Object.values(exps);
};

@withConnect(
  (store: RootStore): Partial<Props> => ({
    tree: store.editor.exports ? getTree(store.editor.exports) : null,
    focus: getFocusedNode(store)
  }),
  {
    onFocus: focusNode,
    onRemove: removeNode,
    onInsert: insertNode,
    onPlace: placeNode
  } as Partial<Props>
)
export default class StructureView extends Component<Props> {
  onDropAppend = ({ over, under }: { [key in DragState]: Node }) => {
    if (over === under) return;
    this.props.onRemove(over);
    this.props.onInsert(over, under);
  };

  onDropAfter = ({ over, under }: { [key in DragState]: Node }) => {
    if (over === under) return;
    this.props.onRemove(over);
    this.props.onPlace(over, under, "after");
  };

  onDropBefore = ({ over, under }: { [key in DragState]: Node }) => {
    if (over === under) return;
    this.props.onRemove(over);
    this.props.onPlace(over, under, "before");
  };

  renderHeader = (node: Node, level: number) => {
    const { focus } = this.props;
    return (
      <ItemView
        node={node}
        focus={focus && node.id === focus.id}
        level={level}
        onDropAfter={this.onDropAfter}
        onDropBefore={this.onDropBefore}
        onDropAppend={this.onDropAppend}
        onRemove={this.props.onRemove}
        onFocus={this.props.onFocus}
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
    const { tree } = this.props;
    if (!tree) return "Open file";
    if (Array.isArray(tree)) {
      return <Fragment>{tree.map(el => this.renderNode(el))}</Fragment>;
    } else {
      return <Fragment>{this.renderNode(tree)}</Fragment>;
    }
  }
}
