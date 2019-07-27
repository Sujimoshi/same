import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { RootStore } from "same";
import { Ul, Li } from "../styled/List";
import { dirname } from "path";
import Collapse from "../Collapse";
import {
  getGroupedComponents,
  getFocusedNode,
  getReferenceComponent
} from "@same/store/project/selectors";
import {
  ComponentConfig,
  ComponentType,
  Node,
  isStyled
} from "@same/configurator";
import Header from "./Header";
import { focus } from "@same/actions/node";
import { createComponent } from "@same/actions/component";
import ListItem from "../ListItem";
import Draggable from "../Draggable";

export interface ComponentsGroup {
  name: string;
  styles: ComponentConfig[];
  examples: ComponentConfig[];
}

export interface Props {
  components?: ComponentConfig[][];
  referenceComponent: ComponentConfig;
  focusedComponent: string;
  onComponentClick?: typeof focus;
  onComponentCreate?: typeof createComponent;
}

export function ComponentsView({
  components,
  onComponentClick,
  onComponentCreate,
  focusedComponent,
  referenceComponent
}: Props) {
  return (
    <Fragment>
      <Header onCreate={() => onComponentCreate("default")} />
      <Ul>
        {components.map(componentGroup => (
          <Li key={componentGroup[0].id}>
            <Collapse
              expanded={!!componentGroup.find(el => el.id === focusedComponent)}
              renderTitle={(toggle, expanded) => (
                <ListItem
                  onClick={toggle}
                  icon={!expanded ? "caret-right" : "caret-down"}
                  actions={{
                    plus: () => onComponentCreate("", componentGroup[0].path),
                    times: () => undefined // TODO: implement folder removing
                  }}
                >
                  {dirname(componentGroup[0].path)}
                </ListItem>
              )}
            >
              {() =>
                componentGroup.map(el => (
                  <Draggable key={el.id} type="structure" data={el}>
                    <ListItem
                      level={1}
                      icon={isStyled(el) ? "palette" : "layer-group"}
                      focus={
                        el.id === focusedComponent ||
                        (referenceComponent && referenceComponent.id === el.id)
                      }
                      onClick={() => onComponentClick(el)}
                      actions={{
                        times: () => undefined // TODO: implement component removing
                      }}
                    >
                      {isStyled(el)
                        ? `${el.name} (${el.node.tag})`
                        : el.name === "default"
                        ? "Example"
                        : el.name}
                    </ListItem>
                  </Draggable>
                ))
              }
            </Collapse>
          </Li>
        ))}
      </Ul>
    </Fragment>
  );
}

export default connect(
  (state: RootStore) => ({
    components: getGroupedComponents(state),
    referenceComponent: getReferenceComponent(state),
    focusedComponent: state.project.focusedComponent
  }),
  {
    onComponentCreate: createComponent,
    onComponentClick: focus
  }
)(ComponentsView);
