import React, { Fragment, useState } from "react";
import Collapse from "../Collapse";
import { ItemWrapper } from "../StructureView/styled";
import { Dictionary, isObject } from "underscore";
import PropsEditorItem from "./Item";
import {
  setField,
  removeField,
  setFieldName,
  setFieldValue
} from "@same/utils/field";
import ListItem from "../ListItem";
import EditListItem from "../ListItem/EditListItem";

export type Container = (dict: Dictionary<any>) => Dictionary<any>;

export interface Props {
  attributes: Dictionary<any>;
  title: string;
  level?: number;
  onChange: (container: Container) => void;
}

export default function ObjectView({
  level = 0,
  title,
  attributes,
  onChange
}: Props) {
  const entries = Object.entries(attributes);
  const simpleFields = entries.filter(([, value]) => !isObject(value));
  const objectFields = entries.filter(([, value]) => isObject(value)).reverse();
  const [expanded, toggle] = useState(true);
  const [creation, setCreation] = useState(false);

  return (
    <>
      <ListItem
        icon={!expanded ? "caret-right" : "caret-down"}
        actions={{
          plus: () => setCreation(true),
          ...(level !== 0 && { times: () => onChange(() => undefined) })
        }}
        level={level}
        onClick={() => toggle(!expanded)}
      >
        {title}
      </ListItem>
      {expanded && (
        <Fragment>
          <PropsEditorItem
            create
            level={level}
            onCreate={(name, value) => onChange(setField(name, value))}
          />
          {simpleFields.map(([name, value]) => (
            <PropsEditorItem
              level={level}
              key={name + value}
              name={name}
              value={value}
              onRemove={() => onChange(removeField(name))}
              onCreate={(name, value) => onChange(setField(name, value))}
              onNameChange={newName => onChange(setFieldName(name, newName))}
              onValueChange={newValue =>
                onChange(setFieldValue(name, newValue))
              }
            />
          ))}
          {creation && (
            <EditListItem
              level={level + 1}
              onBlur={newName => {
                setCreation(false);
                newName && onChange(setField(newName, {}));
              }}
            />
          )}
          {objectFields.map(([name, value]) => (
            <ObjectView
              level={level + 1}
              key={name + value}
              title={name}
              attributes={value}
              onChange={action => onChange(setField(name, action(value)))}
            />
          ))}
        </Fragment>
      )}
    </>
  );
}
