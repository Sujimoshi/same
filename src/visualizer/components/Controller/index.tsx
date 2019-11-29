import React, { Component } from "react";
import { Dictionary } from "underscore";
import { ComponentConfig, Node } from "@same/configurator";
import { connect } from "react-redux";
import { RootStore, Mapper } from "same";
import { getComponents } from "@same/store/project/selectors";
import { setStyles } from "@same/actions/styles";
import TreeVisualizer from "../TreeVisualizer";
import HoverOutline from "../HoverOutline";
import FocusOutline from "../FocusOutline";
import Dragger from "../Dragger";
import {
  getFocusedComponent,
  getFocusedNode,
  getHoveredNodeId,
  getFocusedElement
} from "@same/store/editor/selectors";
import { setFocusedElement, setHoveredNode } from "@same/actions/node";

export interface Props {
  focusedComponent: ComponentConfig;
  components: Dictionary<ComponentConfig>;
  hoveredNodeId: string;
  focusedNode: Node;
  focusedElement: HTMLElement;
  onFocus: (element: HTMLElement) => void;
  onHover: (id: string) => void;
  setStyles: typeof setStyles;
}

export interface State {
  hoveredElement?: HTMLElement;
}

export class Controller extends Component<Props, State> {
  state: State = {
    hoveredElement: null
  };

  componentDidUpdate(prevProps: Props) {
    const { hoveredNodeId } = this.props;
    if (!hoveredNodeId && prevProps.hoveredNodeId !== hoveredNodeId) {
      this.setState({ hoveredElement: null });
    }
  }

  getRenderedElement = (el: HTMLElement) => {
    if (!el) return;
    const { hoveredNodeId, focusedNode } = this.props;
    const id = el.getAttribute("data-id");
    if (id === hoveredNodeId) this.onMouseOver(el);
    if (focusedNode && focusedNode.id === id) this.props.onFocus(el);
  };

  onMouseOver = (hoveredElement: HTMLElement) => {
    const id = hoveredElement.getAttribute("data-id");
    this.props.onHover(id);
    this.state.hoveredElement !== hoveredElement &&
      this.setState({ hoveredElement });
  };

  onMouseOut = () => {
    this.props.onHover(null);
    this.setState({ hoveredElement: null });
  };

  setStyles = (cb: Mapper) => {
    const { setStyles, focusedComponent, focusedNode } = this.props;
    setStyles(focusedComponent, focusedNode, cb);
  };

  renderControls = () => {
    const { hoveredElement } = this.state;
    const { focusedElement } = this.props;
    return (
      <>
        {hoveredElement && <HoverOutline element={hoveredElement} />}
        {focusedElement && (
          <FocusOutline setStyles={this.setStyles} element={focusedElement}>
            {/* <Dragger element={focusedElement} /> */}
          </FocusOutline>
        )}
      </>
    );
  };

  render() {
    const { focusedComponent, components } = this.props;

    if (!focusedComponent) return null;

    return (
      <>
        <TreeVisualizer
          getElement={this.getRenderedElement}
          root={focusedComponent.node}
          components={components}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          onFocus={this.props.onFocus}
        />
        {this.renderControls()}
      </>
    );
  }
}

export default connect(
  (state: RootStore) => ({
    focusedComponent: getFocusedComponent(state),
    components: getComponents(state),
    focusedNode: getFocusedNode(state),
    hoveredNodeId: getHoveredNodeId(state),
    focusedElement: getFocusedElement(state)
  }),
  {
    onFocus: setFocusedElement,
    onHover: setHoveredNode,
    setStyles
  }
)(Controller);
