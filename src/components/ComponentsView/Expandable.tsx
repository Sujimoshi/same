import React, { Component, ComponentType } from "react";
import { Dictionary } from "underscore";
import { ComponentConfig, isStyled } from "@same/configurator";
import { dirname, join } from "path";
import { isSubFolder } from "@same/utils/helpers";

export interface Props {
  folders: Dictionary<any>;
  focusedComponent?: ComponentConfig;
}

export interface State {
  expandedFolders: string[];
}

export interface WithExpandableProps {
  toggle: (folder: string, expand?: boolean) => void;
  isExpanded: (folder: string) => boolean;
}

export default <P extends object>(
  WrapComponent: ComponentType<P & WithExpandableProps>
) => {
  return class extends Component<Props & P, State> {
    state: State = {
      expandedFolders: this.props.focusedComponent
        ? [this.props.focusedComponent.folder]
        : []
    };

    componentDidUpdate(prevProps: Props) {
      const { focusedComponent } = this.props;
      if (focusedComponent && prevProps.focusedComponent !== focusedComponent) {
        this.expand(focusedComponent.folder);
      }
    }

    expand = (folder: string) => {
      const { expandedFolders } = this.state;
      if (expandedFolders.includes(folder)) return;
      this.setState({ expandedFolders: [...expandedFolders, folder] });
    };

    isExpanded = (folder: string) => {
      const { expandedFolders } = this.state;
      return expandedFolders.includes(folder);
    };

    toggle = (folder: string, expand: boolean = !this.isExpanded(folder)) => {
      if (expand) {
        this.expand(folder);
      } else {
        this.constrict(folder);
      }
    };

    constrict = (folder: string) => {
      const { expandedFolders } = this.state;
      this.setState({
        expandedFolders: expandedFolders.filter(el => el !== folder)
      });
    };

    render() {
      return (
        <WrapComponent
          {...this.props}
          toggle={this.toggle}
          isExpanded={this.isExpanded}
        />
      );
    }
  };
};
