import React, { Fragment, Component, ReactNode } from "react";
import { connect } from "react-redux";
import { RootStore } from "same";
import { Ul, Li } from "../styled/List";
import { dirname, join, basename } from "path";
import { getComponents, getFoldersSystem } from "@same/store/project/selectors";
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
import { isSubFolder } from "@same/utils/helpers";

export interface Props {
  components?: Dictionary<ComponentConfig>;
  referenceComponent?: ComponentConfig;
  focusedComponent?: ComponentConfig;
  onComponentClick?: typeof focus;
  onComponentCreate?: typeof createComponent;
  onFolderCreate?: (folderName: string) => void;
  onFolderRemove?: (fodlerName: string) => void;
  folders: Dictionary<any>;
}

export interface State {
  expandedFolders: string[];
  folderCreation: string;
}

export class ComponentsView extends Component<Props, State> {
  state: State = {
    expandedFolders: this.props.focusedComponent
      ? [this.props.focusedComponent.path]
      : [],
    folderCreation: ""
  };

  componentDidUpdate(prevProps: Props) {
    const { focusedComponent } = this.props;
    if (focusedComponent && prevProps.focusedComponent !== focusedComponent) {
      this.expand(dirname(focusedComponent.path));
    }
  }

  expand = (folder: string) => {
    const { expandedFolders } = this.state;
    if (expandedFolders.includes(folder)) return;
    const expandThat = folder
      .replace(/^\//, "")
      .split("/")
      .reduce((tmp, el, i) => {
        const prev = tmp[i - 1];
        tmp.push(prev ? join("/", prev, el) : join("/", el));
        return tmp;
      }, [])
      .filter(el => !expandedFolders.includes(el));
    if (expandThat.length) {
      this.setState({ expandedFolders: [...expandedFolders, ...expandThat] });
    }
  };

  isExpanded = (folder: string) => {
    const { expandedFolders } = this.state;
    return expandedFolders.some(expandedFolder =>
      isSubFolder(folder)(expandedFolder)
    );
  };

  toggle = (folder: string) => {
    if (this.isExpanded(folder)) {
      this.constrict(folder);
    } else {
      this.expand(folder);
    }
  };

  constrict = (folder: string) => {
    const { expandedFolders } = this.state;
    this.setState({
      expandedFolders: expandedFolders.filter(el => !isSubFolder(folder)(el))
    });
  };

  onComponentCreate = (folder: string) => {
    this.props.onComponentCreate(basename(folder), folder + "/index.js");
    this.expand(folder);
  };

  onFolderCreation = (folder: string = "/") => {
    this.expand(folder);
    this.setState({ folderCreation: folder });
  };

  onFolderCreationFinish = (folder: string) => {
    if (folder) {
      this.props.onFolderCreate(join("/", this.state.folderCreation, folder));
    }
    this.setState({ folderCreation: "" });
  };

  onFolderRemove(folderPath: string) {
    this.props.onFolderRemove(folderPath);
    this.constrict(folderPath);
  }

  renderFolderCreateItem = (level: number = 0) => (
    <ListItem
      onEditFinish={this.onFolderCreationFinish}
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
      : component.name === "default"
      ? "Example"
      : component.name;
  }

  renderListItem = (component: ComponentConfig, level: number = 0) => {
    const {
      onComponentClick,
      focusedComponent,
      referenceComponent
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
            trash: () => undefined // TODO: implement component removing
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
    const expanded = this.isExpanded(folderPath);
    const componentsGroup = Object.values(components).filter(
      el => dirname(el.path) === folderPath
    );

    return (
      <Fragment key={folderPath}>
        <ListItem
          level={level}
          onClick={() => this.toggle(folderPath)}
          icon={!expanded ? "caret-right" : "caret-down"}
          actions={{
            "plus-circle": () => this.onComponentCreate(folderPath),
            "folder-plus": () => this.onFolderCreation(folderPath),
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
    onComponentClick: focus
  }
)(ComponentsView);
