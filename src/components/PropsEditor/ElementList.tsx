import React, { Fragment } from "react";
import PropsEditorItem from "./Item";
import { connect } from "react-redux";
import { RootStore } from "same";
import { Element } from "@same/parser/structure";
import { setNode } from "@same/store/editor/actions";
import { setProps } from "@same/actions/editor";

export interface Props {
  node: Element;
  attributes?: { [name: string]: any };
  onRemove?: (node: Element, name: string) => void;
  onNameChange?: (node: Element, oldName: string, newName: string) => void;
  onValueChange?: (node: Element, name: string, newValue: any) => void;
  onCreate?: (node: Element, newName: string, newValue: any) => void;
}

function ElementList({
  node,
  attributes,
  onRemove,
  onNameChange,
  onValueChange,
  onCreate
}: Props) {
  return (
    <Fragment>
      <PropsEditorItem
        create
        onCreate={(name, value) => onCreate(node, name, value)}
      />
      {Object.entries(attributes)
        .reverse()
        .map(([name, value]) => (
          <PropsEditorItem
            key={name + value}
            name={name}
            value={value}
            onRemove={() => onRemove(node, name)}
            onCreate={(newName, newValue) => onCreate(node, newName, newValue)}
            onNameChange={newName => onNameChange(node, name, newName)}
            onValueChange={newValue => onValueChange(node, name, newValue)}
          />
        ))}
    </Fragment>
  );
}

export default connect(
  (state: RootStore, props: Props) => ({
    attributes: props.node.props
  }),
  {
    onCreate: (node, name, value) => setProps(node, { [name]: value }),
    onRemove: (node, name) => setProps(node, { [name]: undefined }),
    onNameChange: (node, name, newName) =>
      setProps(node, { [name]: undefined, [newName]: node.props[name] }),
    onValueChange: (node, name, newValue) =>
      setProps(node, { [name]: newValue })
  } as Partial<Props>
)(ElementList);
