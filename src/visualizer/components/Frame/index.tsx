import React from "react";
import Frame, { FrameContextConsumer } from "react-frame-component";
import { memoize } from "underscore";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/core";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import GlobalStyles from "../GlobalStyles";
import Controller from "../Controller";

export enum Mode {
  Visual = "visual",
  Control = "control"
}

const getStyledCache = memoize((document: Document) => {
  return createCache({
    container: document.getElementsByTagName("head").item(0)
  });
});

export default function VisualEditor() {
  return (
    <Frame style={{ width: "100%", height: "100%", border: "0" }}>
      <FrameContextConsumer>
        {({ document, window }: { document: Document; window: Window }) => (
          <CacheProvider value={getStyledCache(document)}>
            <DndProvider backend={HTML5Backend} context={window}>
              <GlobalStyles />
              <Controller />
            </DndProvider>
          </CacheProvider>
        )}
      </FrameContextConsumer>
    </Frame>
  );
}
