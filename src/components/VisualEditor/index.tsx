import * as React from "react";
import { withConnect } from "@same/utils/connect";
import ASTFile from "@same/parser/ASTFile";
import { RootStore } from "same";
import { basename, dirname, join, resolve } from "path";
import styled from "@emotion/styled";
import _ from "underscore";

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
  projectPath?: string;
  file?: string;
}

@withConnect(
  ({ editor, project }: RootStore): Partial<Props> => ({
    projectPath: project.path,
    file: editor.file
  })
)
export default class VisualEditor extends React.Component<Props> {
  renderComponent() {
    const { file, projectPath } = this.props;
    const path = join(projectPath, file);
    delete require.cache[path];
    const Component = require(path).default;
    if (typeof Component === "function") return <Component />;
  }

  render() {
    if (!this.props.projectPath || !this.props.file) return "Open file";
    return (
      <VisualEditorView className="visual-editor">
        {this.renderComponent()}
      </VisualEditorView>
    );
  }
}
