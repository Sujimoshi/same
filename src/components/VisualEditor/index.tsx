import React from "react";
import Frame, { FrameContextConsumer } from "react-frame-component";
import { connect } from "react-redux";
import { ComponentConfig } from "@same/configurator";
import { Dictionary, memoize } from "underscore";
import {
  getFocusedComponent,
  getComponents,
  getFocusedNodeId
} from "@same/store/project/selectors";
import { RootStore } from "same";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/core";
import Controller from "./Controller";
import { focusNode } from "@same/actions/node";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

export enum Mode {
  Visual = "visual",
  Control = "control"
}

interface Props {
  component: ComponentConfig;
  allComponents: Dictionary<ComponentConfig>;
  mode: Mode;
  focusedNodeId: string;
  onFocus: typeof focusNode;
}

const getStyledCache = memoize((document: Document) => {
  return createCache({
    container: document.getElementsByTagName("head").item(0)
  });
});

export function VisualEditor({
  focusedNodeId,
  onFocus,
  component,
  allComponents
}: Props) {
  return (
    <Frame style={{ width: "100%", height: "90vh", border: "0" }}>
      <FrameContextConsumer>
        {({ document, window }: { document: Document; window: Window }) => (
          <CacheProvider value={getStyledCache(document)}>
            <DndProvider backend={HTML5Backend} context={window}>
              <Controller
                onFocus={onFocus}
                focusedNodeId={focusedNodeId}
                component={component}
                allComponents={allComponents}
              />
            </DndProvider>
          </CacheProvider>
        )}
      </FrameContextConsumer>
    </Frame>
  );
}

export default connect(
  (state: RootStore) => ({
    component: getFocusedComponent(state),
    allComponents: getComponents(state),
    focusedNodeId: getFocusedNodeId(state)
  }),
  { onFocus: focusNode }
)(VisualEditor);
