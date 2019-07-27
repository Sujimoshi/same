import React, { useState, useEffect } from "react";
import { RootStore } from "same";
import { join } from "path";
import styled from "@emotion/styled";
import _ from "underscore";
import { ComponentConfig } from "@same/configurator";
import { getFocusedComponent } from "@same/store/project/selectors";
import { connect } from "react-redux";
import { SRC_FOLDER } from "../../storage/index";

const VisualEditorView = styled.div({
  padding: "1rem",
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
  projectPath: string;
  component: ComponentConfig;
}

export function VisualEditor({ component, projectPath }: Props) {
  const [update, setUpdate] = useState(0);
  useEffect(() => {
    setTimeout(() => setUpdate(update + 1), 500);
  }, [component]);

  if (!projectPath || !component) return <div>Open file</div>;
  const path = join(projectPath, SRC_FOLDER, component.path);
  delete require.cache[path];
  const Component = require(path)[component.name];

  return (
    <VisualEditorView className="visual-editor">
      {/* <iframe src="" frameborder="0"></iframe> */}
      <Component />
    </VisualEditorView>
  );
}

export default connect(
  (state: RootStore): Partial<Props> => {
    return {
      component: getFocusedComponent(state),
      projectPath: state.project.path
    };
  }
)(VisualEditor);
