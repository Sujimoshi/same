import Header from "./Header";
import React, { Fragment, Component } from "react";
import DruggableNode from "./DraggableNode";
import { thunkSaveEditor, focusNode } from "@same/store/editor/actions";
import { DragState } from "../hooks/useDraggable";
import ASTFile from "@same/parser/ASTFile";
import ASTNode from "@same/parser/ASTNode";
import { Ul, Li, ItemWrapper, ItemContent, ActionIcon } from "./styled";
import { withConnect } from "@same/utils/connect";
import { RootStore } from "same";
import { ItemView } from "./ItemView";
import ASTJSXElement from "@same/parser/ASTJSXElement";
import { BaseNode } from "@babel/types";

interface State {}

interface Props {
  thunkSaveEditor?: typeof thunkSaveEditor;
  astFile?: ASTFile;
  filePath?: string;
  focusedNode?: BaseNode;
  focusNode?: typeof focusNode;
}

@withConnect(
  (store: RootStore): Partial<Props> => ({
    astFile: new ASTFile(store.editor.astFile),
    filePath: store.editor.filePath,
    focusedNode: store.editor.focusedNode
  }),
  { thunkSaveEditor, focusNode } as Partial<Props>
)
export default class StructureView extends Component<Props, State> {
  saveEditor() {
    this.props.thunkSaveEditor(
      this.props.astFile.code(),
      this.props.filePath,
      this.props.astFile.node
    );
  }

  onDropAppend = ({ over, under }: { [key in DragState]: ASTNode }) => {
    under.append(over.detach());
    this.saveEditor();
  };

  onDropAfter = ({ over, under }: { [key in DragState]: ASTNode }) => {
    under.after(over.detach());
    this.saveEditor();
  };

  onRemove = (node: ASTNode) => {
    node.detach();
    this.saveEditor();
  };

  onFocus = (node: ASTJSXElement) => {
    this.props.focusNode(node);
  };

  renderHeader = (node: ASTNode, level: number) => {
    const { focusedNode } = this.props;
    return (
      <ItemView
        node={node}
        focus={focusedNode && node.node === focusedNode}
        level={level}
        onDropAfter={this.onDropAfter}
        onDropAppend={this.onDropAppend}
        onRemove={this.onRemove}
        onFocus={this.onFocus}
      />
    );
  };

  renderChildrens = (node: ASTNode, level: number) => {
    const childrens = node.childrens().filter(el => !el.isFake());
    return childrens && childrens.length ? (
      <Ul>
        {childrens.map(el => (
          <Li key={el.key()}>{this.renderNode(el, level + 1)}</Li>
        ))}
      </Ul>
    ) : null;
  };

  renderNode = (node: ASTNode, level: number = 0) => {
    return (
      <div className="tree-view">
        {this.renderHeader(node, level)}
        {this.renderChildrens(node, level)}
      </div>
    );
  };

  render() {
    return (
      <Fragment>
        <Header>Structure</Header>
        {this.props.astFile.jsxRoots().map(root => (
          <Fragment key={root.key()}>{this.renderNode(root)}</Fragment>
        ))}
      </Fragment>
    );
  }
}
