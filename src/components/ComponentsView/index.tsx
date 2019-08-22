import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { RootStore } from "same";
import { Ul, Li } from "../styled/List";
import { dirname } from "path";
import Collapse from "../Collapse";
import { getGroupedComponents } from "@same/store/project/selectors";
import { ComponentConfig, isStyled } from "@same/configurator";
import Header from "./Header";
import { focus } from "@same/actions/node";
import { createComponent } from "@same/actions/component";
import ListItem from "../ListItem";
import Draggable from "../Draggable";
import { getReferenceComponent } from "@same/store/editor/selectors";

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

export class ComponentsView extends Component<Props> {
  renderTitle(component: ComponentConfig) {
    return isStyled(component)
      ? `${component.name} (${component.node.tag})`
      : component.name === "default"
      ? "Example"
      : component.name;
  }

  renderListItem = (component: ComponentConfig) => {
    const {
      onComponentClick,
      focusedComponent,
      referenceComponent
    } = this.props;

    return (
      <Draggable key={component.id} type="structure" data={component}>
        <ListItem
          level={1}
          icon={isStyled(component) ? "palette" : "layer-group"}
          focus={
            component.id === focusedComponent ||
            (referenceComponent && referenceComponent.id === component.id)
          }
          onClick={() => onComponentClick(component)}
          actions={{
            times: () => undefined // TODO: implement component removing
          }}
        >
          {this.renderTitle(component)}
        </ListItem>
      </Draggable>
    );
  };

  render() {
    const { components, onComponentCreate, focusedComponent } = this.props;
    return (
      <Fragment>
        <Header onCreate={() => onComponentCreate("default")} />
        <Ul>
          {components.map(componentGroup => (
            <Li key={componentGroup[0].id}>
              <Collapse
                expanded={
                  !!componentGroup.find(el => el.id === focusedComponent)
                }
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
                {() => componentGroup.map(this.renderListItem)}
              </Collapse>
            </Li>
          ))}
        </Ul>
      </Fragment>
    );
  }
}

export default connect(
  (state: RootStore) => ({
    components: getGroupedComponents(state),
    referenceComponent: getReferenceComponent(state),
    focusedComponent: state.editor.focusedComponent
  }),
  {
    onComponentCreate: createComponent,
    onComponentClick: focus
  }
)(ComponentsView);
