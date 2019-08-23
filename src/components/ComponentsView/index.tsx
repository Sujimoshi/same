import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { RootStore } from "same";
import { Ul, Li } from "../styled/List";
import { basename, dirname } from "path";
import Collapse from "../Collapse";
import { getFolders, getComponents } from "@same/store/project/selectors";
import { ComponentConfig, isStyled } from "@same/configurator";
import Header from "./Header";
import { focus } from "@same/actions/node";
import { createComponent } from "@same/actions/component";
import ListItem from "../ListItem";
import Draggable from "../Draggable";
import {
  getReferenceComponent,
  getFocusedComponent
} from "@same/store/editor/selectors";
import { createFolder, removeFolder } from "@same/actions/folder";
import { Dictionary } from "underscore";

export interface ComponentsGroup {
  name: string;
  styles: ComponentConfig[];
  examples: ComponentConfig[];
}

export interface Props {
  components?: Dictionary<ComponentConfig>;
  referenceComponent?: ComponentConfig;
  focusedComponent?: ComponentConfig;
  onComponentClick?: typeof focus;
  onComponentCreate?: typeof createComponent;
  onFolderCreate?: (folderName: string) => void;
  onFolderRemove?: (fodlerName: string) => void;
  folders: string[];
}

export interface State {
  folderCreation: string;
  componentCreation: string;
}

export class ComponentsView extends Component<Props, State> {
  state = {
    folderCreation: "",
    componentCreation: ""
  };

  onFolderCreation = (folder: string = "/") => {
    this.setState({ folderCreation: folder });
  };

  onFolderCreationFinish = (folder: string) => {
    this.props.onFolderCreate(
      this.state.folderCreation === "/"
        ? folder
        : `${this.state.folderCreation}/${folder}`
    );
    this.setState({ folderCreation: "" });
  };

  renderFolderCreateItem = (value: string = "/", level: number = 0) => (
    <ListItem
      onEditFinish={this.onFolderCreationFinish}
      icon="caret-right"
      edit
      level={level}
    >
      {basename(value)}
    </ListItem>
  );

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
            (focusedComponent && component.id === focusedComponent.id) ||
            (referenceComponent && referenceComponent.id === component.id)
          }
          onDoubleClick={() => onComponentClick(component)}
          actions={{
            trash: () => undefined // TODO: implement component removing
          }}
        >
          {this.renderTitle(component)}
        </ListItem>
      </Draggable>
    );
  };

  renderDirectoryItem = (folder: string) => {
    const { focusedComponent, components } = this.props;
    const { folderCreation } = this.state;
    const componentsGroup = Object.values(components).filter(
      el => dirname(el.path) === folder
    );
    const isFolderCreation = folderCreation === folder;
    const isFocusedFolder =
      focusedComponent && folder === dirname(focusedComponent.path);

    return (
      <Li key={folder}>
        <Collapse
          key={folderCreation === folder ? folder : "none"}
          expanded={isFolderCreation || isFocusedFolder}
          renderTitle={(toggle, expanded) => (
            <ListItem
              onClick={toggle}
              icon={!expanded ? "caret-right" : "caret-down"}
              actions={{
                "plus-circle": () =>
                  this.props.onComponentCreate("", folder + "/index.js"),
                "folder-plus": () => this.onFolderCreation(folder),
                trash: () => this.props.onFolderRemove(folder)
              }}
            >
              {basename(folder)}
            </ListItem>
          )}
        >
          {() => (
            <>
              {isFolderCreation && this.renderFolderCreateItem()}
              {componentsGroup.map(this.renderListItem)}
            </>
          )}
        </Collapse>
      </Li>
    );
  };

  render() {
    const { folders } = this.props;
    return (
      <Fragment>
        <Header
          actions={{
            "folder-plus": this.onFolderCreation
          }}
        />
        <Ul>
          <Li key="/">
            {this.state.folderCreation === "/" && this.renderFolderCreateItem()}
          </Li>
          {folders.map(this.renderDirectoryItem)}
        </Ul>
      </Fragment>
    );
  }
}

export default connect(
  (state: RootStore) => ({
    components: getComponents(state),
    referenceComponent: getReferenceComponent(state),
    focusedComponent: getFocusedComponent(state),
    folders: getFolders(state)
  }),
  {
    onComponentCreate: createComponent,
    onFolderCreate: createFolder,
    onFolderRemove: removeFolder,
    onComponentClick: focus
  }
)(ComponentsView);
