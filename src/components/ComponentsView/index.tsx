import React, { Fragment, Component, ReactNode } from "react";
import { connect } from "react-redux";
import { RootStore } from "same";
import { Ul, Li } from "../styled/List";
import { dirname, join, basename } from "path";
import { getComponents, getFolders } from "@same/store/project/selectors";
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
import {
  addFolder,
  removeFolder,
  editFolderName,
  moveFolder
} from "@same/actions/folder";
import { Dictionary } from "underscore";
import Expandable, { WithExpandableProps } from "./Expandable";
import FolderItem from "./FolderItem";
import { Folder } from "@same/store/project/reducers";
import ComponentItem from "./ComponentItem";
import { moveComponent } from "../../actions/component";

export interface Props extends WithExpandableProps {
  components?: Dictionary<ComponentConfig>;
  referenceComponent?: ComponentConfig;
  focusedComponent?: ComponentConfig;
  onComponentClick?: typeof focus;
  onComponentCreate?: typeof createComponent;
  onFolderCreate?: (name: string, to: string) => void;
  onFolderRemove?: (id: string) => void;
  onComponentRemove: (id: string) => void;
  onFolderEdit: (id: string, newName: string) => void;
  onFolderMove: (id: string, to: string) => void;
  onComponentMove: (componentId: string, folderId: string) => void;
  folders: Folder;
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
    this.setState({ folderEdit: "" });
    const { folderEdit } = this.state;
    this.props.toggle(folderEdit, false);
    this.props.onFolderEdit(folderEdit, newName);
  };

  onComponentCreate = (folder: Folder) => {
    this.props.toggle(folder.id, true);
    this.props.onComponentCreate(folder);
  };

  onFolderCreation = (folder: string = "root") => {
    this.props.toggle(folder, true);
    this.setState({ folderCreation: folder });
  };

  onFolderCreated = (folder: string) => {
    const { onFolderCreate } = this.props;
    if (folder) onFolderCreate(folder, this.state.folderCreation);
    this.setState({ folderCreation: "" });
  };

  onFolderRemove(folderPath: string) {
    this.props.onFolderRemove(folderPath);
    this.props.toggle(folderPath, false);
  }

  renderFolderCreateItem = (level: number = 0) => (
    <ListItem
      edit
      level={level}
      icon="caret-right"
      onEditFinish={this.onFolderCreated}
    >
      {""}
    </ListItem>
  );

  renderListItem = (component: ComponentConfig, level: number = 0) => {
    const {
      onComponentClick,
      focusedComponent,
      referenceComponent,
      onComponentRemove
    } = this.props;

    return (
      <ComponentItem
        key={component.id}
        level={level}
        component={component}
        focus={
          (focusedComponent && component.id === focusedComponent.id) ||
          (referenceComponent && referenceComponent.id === component.id)
        }
        onClick={() => console.log("onComponentFocus")}
        onDoubleClick={() => onComponentClick(component)}
        onRemove={onComponentRemove}
      />
    );
  };

  renderFolderItem = (folder: Folder, level = 0): ReactNode => {
    const { onComponentMove } = this.props;
    const componentsGroup = Object.values(this.props.components).filter(
      el => el.folder === folder.id
    );

    return (
      <FolderItem
        level={level}
        folder={folder}
        key={folder.id}
        onEditFinish={this.onFolderEditFinish}
        edit={this.state.folderEdit === folder.id}
        expanded={this.props.isExpanded(folder.id)}
        onClick={() => this.props.toggle(folder.id)}
        onFolderDrop={folderId => this.props.onFolderMove(folderId, folder.id)}
        onComponentDrop={componentId => onComponentMove(componentId, folder.id)}
        actions={{
          "plus-circle": () => this.onComponentCreate(folder),
          "folder-plus": () => this.onFolderCreation(folder.id),
          edit: () => this.onFolderEdit(folder.id),
          trash: () => this.onFolderRemove(folder.id)
        }}
      >
        {() => (
          <>
            {this.state.folderCreation === folder.id &&
              this.renderFolderCreateItem(level + 1)}
            {folder.children.map(el => this.renderFolderItem(el, level + 1))}
            {componentsGroup.map(el => this.renderListItem(el, level + 1))}
          </>
        )}
      </FolderItem>
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
          {this.state.folderCreation === "root" && (
            <Li key="/">{this.renderFolderCreateItem()}</Li>
          )}
          {folders.children.map(folder => (
            <Li key={folder.id}>{this.renderFolderItem(folder)}</Li>
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
    folders: getFolders(state)
  }),
  {
    onComponentCreate: createComponent,
    onFolderCreate: addFolder,
    onFolderRemove: removeFolder,
    onComponentClick: focus,
    onComponentRemove: removeComponent,
    onFolderEdit: editFolderName,
    onFolderMove: moveFolder,
    onComponentMove: moveComponent
  }
)(Expandable(ComponentsView));
