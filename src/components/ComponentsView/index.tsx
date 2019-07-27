import React, { Fragment } from "react";
import { connect } from "react-redux";
import { RootStore } from "same";
import { ItemWrapper, Ul, Li } from "../styled/List";
import { basename, dirname } from "path";
import Collapse from "../Collapse";
import { getGroupedComponents } from "@same/store/project/selectors";
import { ComponentConfig, ComponentType } from "@same/configurator";
import Header from "./Header";
import { focus } from "@same/actions/node";
import { createComponent } from "@same/actions/component";
import Item from "./Item";

export interface ComponentsGroup {
  name: string;
  styles: ComponentConfig[];
  examples: ComponentConfig[];
}
export interface Props {
  components?: ComponentConfig[][];
  focusedComponent: string;
  onComponentClick?: typeof focus;
  onComponentCreate?: typeof createComponent;
}

export function ComponentsView({
  components,
  onComponentClick,
  onComponentCreate,
  focusedComponent
}: Props) {
  return (
    <Fragment>
      <Header onCreate={onComponentCreate} />
      <Ul>
        {components.map(componentGroup => (
          <Li key={componentGroup[0].id}>
            <Collapse
              expanded={!!componentGroup.find(el => el.id === focusedComponent)}
              renderTitle={() => (
                <ItemWrapper styled={{ paddingLeft: "2rem" }}>
                  {dirname(componentGroup[0].path)}
                </ItemWrapper>
              )}
            >
              {() =>
                componentGroup
                  .filter(el => el.type === ComponentType.Styled)
                  .map(component => (
                    <Item
                      key={component.id}
                      component={component}
                      focus={component.id === focusedComponent}
                      onClick={() =>
                        onComponentClick(componentGroup[0], component.id)
                      }
                    />
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
    focusedComponent: state.project.focusedComponent
  }),
  {
    onComponentCreate: createComponent,
    onComponentClick: focus
  }
)(ComponentsView);
