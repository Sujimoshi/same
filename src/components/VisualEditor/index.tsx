import * as React from "react";
import { withConnect } from "@same/utils/connect";
import ASTFile from "@same/parser/ASTFile";
import { RootStore } from "same";
import { thunkSaveEditor } from "@same/store/editor/actions";
import { basename, dirname } from "path";
import ASTJSXElement from "../../parser/ASTJSXElement";
import styled from "@emotion/styled";
import _ from "underscore";
import ASTRenderer, { component } from "./ASTRenderer";

const VisualEditorView = styled.div({
  "[draggable]": {
    cursor: "move",
    userSelect: "none"
  },
  "[draggable]:hover": {
    backgroundColor: "lightblue"
  },
  "[draggable] [draggable]:hover": {
    backgroundColor: "pink"
  }
});

interface Props {
  thunkSaveEditor?: typeof thunkSaveEditor;
  astFile?: ASTFile;
  componentName?: string;
  filePath?: string;
}

let dragging: HTMLElement;

@withConnect(
  (store: RootStore): Partial<Props> => ({
    astFile: new ASTFile(store.editor.astFile),
    filePath: store.editor.filePath,
    componentName: basename(dirname(store.editor.filePath))
  }),
  { thunkSaveEditor } as Partial<Props>
)
export default class VisualEditor extends React.Component<Props> {
  setupDND(node: HTMLElement) {
    node.setAttribute("draggable", "true");
    node.addEventListener(
      "dragstart",
      e => {
        e.stopPropagation();
        dragging = node;
      },
      false
    );
    node.addEventListener(
      "dragover",
      e => {
        e.stopPropagation();
        e.preventDefault();
      },
      false
    );
    node.addEventListener(
      "drop",
      (e: Event) => {
        e.stopPropagation();
        (e.target as any).astNode.append((dragging as any).astNode.detach());
        this.props.thunkSaveEditor(
          this.props.astFile.code(),
          this.props.filePath,
          this.props.astFile.node
        );
      },
      false
    );
  }

  renderComponent() {
    delete require.cache[this.props.filePath];
    const Component = require(this.props.filePath).default;
    return <Component />;
  }

  render() {
    return (
      <VisualEditorView className="visual-editor">
        {this.renderComponent()}
      </VisualEditorView>
    );
  }
}
