import React, { Fragment, Component, ReactNode } from "react";
import { connect } from "react-redux";
import { RootStore } from "same";
import { Ul, Li } from "../styled/List";
import { dirname, join, basename } from "path";
import { getComponents, getFoldersSystem } from "@same/store/project/selectors";
import { ComponentConfig, isStyled } from "@same/configurator";
import Header from "./Header";
import { focus } from "@same/actions/node";
import { createComponent, removeComponent } from "@same/actions/component";
import ListItem from "../ListItem";
import Draggable from "../Draggable";
import {
  getReferenceComponent,
  getFocusedComponent
} from "@same/store/editor/selectors";
import { createFolder, removeFolder, editFolder } from "@same/actions/folder";
import { Dictionary } from "underscore";
import Expandable, { WithExpandableProps } from "./Expandable";

export interface Props extends WithExpandableProps {
  components?: Dictionary<ComponentConfig>;
  referenceComponent?: ComponentConfig;
  focusedComponent?: ComponentConfig;
  onComponentClick?: typeof focus;
  onComponentCreate?: typeof createComponent;
  onFolderCreate?: (folderName: string) => void;
  onFolderRemove?: (fodlerName: string) => void;
  onComponentRemove: (id: string) => void;
  onFolderEdit: (folder: string, newName: string) => void;
  folders: Dictionary<any>;
}

export interface State {
  folderCreation: string;
  folderEdit: string;
}

export class ComponentsView extends Component<Props, State> {
  state: State = {
    folderCreation: "",
    folderEdit: ""
  };

  onFolderEdit = (folder: string) => {
    this.setState({ folderEdit: folder });
  };

  onFolderEditFinish = (newName: string) => {
    const { folderEdit } = this.state;
    this.props.onFolderEdit(folderEdit, newName);
    this.props.toggle(folderEdit, false);
    this.setState({ folderEdit: "" });
  };

  onComponentCreate = (folder: string) => {
    this.props.onComponentCreate(folder);
    this.props.toggle(folder, true);
  };

  onFolderCreation = (folder: string = "/") => {
    this.props.toggle(folder, true);
    this.setState({ folderCreation: folder });
  };

  onFolderCreated = (folder: string) => {
    if (folder) {
      this.props.onFolderCreate(join("/", this.state.folderCreation, folder));
    }
    this.setState({ folderCreation: "" });
  };

  onFolderRemove(folderPath: string) {
    this.props.onFolderRemove(folderPath);
    this.props.toggle(folderPath, false);
  }

  renderFolderCreateItem = (level: number = 0) => (
    <ListItem
      onEditFinish={this.onFolderCreated}
      icon="caret-right"
      edit
      level={level}
    >
      {""}
    </ListItem>
  );

  renderTitle(component: ComponentConfig) {
    return isStyled(component)
      ? `${component.name} (${component.node.tag})`
      : basename(component.path, ".js");
  }

  renderListItem = (component: ComponentConfig, level: number = 0) => {
    const {
      onComponentClick,
      focusedComponent,
      referenceComponent,
      onComponentRemove
    } = this.props;

    return (
      <Draggable key={component.id} type="structure" data={component}>
        <ListItem
          level={level}
          icon={isStyled(component) ? "palette" : "layer-group"}
          focus={
            (focusedComponent && component.id === focusedComponent.id) ||
            (referenceComponent && referenceComponent.id === component.id)
          }
          onDoubleClick={() => onComponentClick(component)}
          actions={{
            trash: () => onComponentRemove(component.id)
          }}
        >
          {this.renderTitle(component)}
        </ListItem>
      </Draggable>
    );
  };

  renderDirectoryItem = (
    [folder, childrens]: [string, any],
    level = 0
  ): ReactNode => {
    const folderPath = childrens.path;
    const { components } = this.props;
    const { folderCreation } = this.state;
    const expanded = this.props.isExpanded(folderPath);
    const componentsGroup = Object.values(components).filter(
      el => dirname(el.path) === folderPath
    );

    return (
      <Fragment key={folderPath}>
        <ListItem
          edit={this.state.folderEdit === folderPath}
          onEditFinish={this.onFolderEditFinish}
          level={level}
          onClick={() => this.props.toggle(folderPath)}
          icon={!expanded ? "caret-right" : "caret-down"}
          actions={{
            "plus-circle": () => this.onComponentCreate(folderPath),
            "folder-plus": () => this.onFolderCreation(folderPath),
            edit: () => this.onFolderEdit(folderPath),
            trash: () => this.onFolderRemove(folderPath)
          }}
        >
          {folder}
        </ListItem>
        {expanded && (
          <>
            {folderCreation === folderPath &&
              this.renderFolderCreateItem(level + 1)}
            {Object.entries(childrens).map(el =>
              this.renderDirectoryItem(el, level + 1)
            )}
            {componentsGroup.map(el => this.renderListItem(el, level + 1))}
          </>
        )}
      </Fragment>
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
          {this.state.folderCreation === "/" && (
            <Li key="/">{this.renderFolderCreateItem()}</Li>
          )}
          {Object.entries(folders).map(folder => (
            <Li key={folder[0]}>{this.renderDirectoryItem(folder)}</Li>
          ))}
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
    folders: getFoldersSystem(state)
  }),
  {
    onComponentCreate: createComponent,
    onFolderCreate: createFolder,
    onFolderRemove: removeFolder,
    onComponentClick: focus,
    onComponentRemove: removeComponent,
    onFolderEdit: editFolder
  }
)(Expandable(ComponentsView));
