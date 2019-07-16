import React from "react";
import { connect } from "react-redux";
import { RootStore } from "same";
import { SameConfig, generate } from "@same/parser";
import { ItemWrapper, Ul, Li } from "../styled/List";
import { openFile } from "@same/actions/editor";
import { basename } from "path";
import Collapse from "../Collapse";

export interface Props {
  components?: SameConfig[];
  onComponentClick: typeof openFile;
}

export function ComponentsView({ components, onComponentClick }: Props) {
  if (components[0]) {
    console.log(generate(components[0].examples[0]));
    console.log(generate(components[0].main));
  }
  return (
    <Ul>
      {components.map(component => (
        <Li key={component.id}>
          <Collapse title={<ItemWrapper>{component.name}</ItemWrapper>}>
            <Collapse
              title={
                <ItemWrapper styled={{ paddingLeft: "2rem" }}>
                  styles
                </ItemWrapper>
              }
            >
              {Object.values(component.main.exports).map(el => (
                <ItemWrapper
                  key={el.id}
                  styled={{ paddingLeft: "4rem" }}
                  onClick={() =>
                    onComponentClick(component.main.file, component.main, el.id)
                  }
                >
                  {el.name} ({el.tag})
                </ItemWrapper>
              ))}
            </Collapse>
            <Collapse
              title={
                <ItemWrapper styled={{ paddingLeft: "2rem" }}>
                  examples
                </ItemWrapper>
              }
            >
              {component.examples.map(el => (
                <ItemWrapper
                  key={el.id}
                  styled={{ paddingLeft: "4rem" }}
                  onClick={() => onComponentClick(el.file, el)}
                >
                  {basename(el.file, ".js")}
                </ItemWrapper>
              ))}
            </Collapse>
          </Collapse>
        </Li>
      ))}
    </Ul>
  );
}

export default connect(
  (state: RootStore) => ({
    components: state.project.components
  }),
  { onComponentClick: openFile }
)(ComponentsView);
