import React, { Fragment } from "react";
import PropsEditorItem from "./Item";
import { Dictionary, isObject } from "underscore";
import {
  setField,
  removeField,
  changeFieldName,
  changeFieldValue
} from "@same/utils/field";

export interface Props {
  attributes?: { [name: string]: any };
  onChange: (factory: (styles: Dictionary<any>) => Dictionary<any>) => void;
}

export default function ElementList({ attributes, onChange }: Props) {
  const props = Object.entries(attributes).reverse();
  return (
    <Fragment>
      <PropsEditorItem
        create
        onCreate={(name, value) => onChange(setField(name, value))}
      />
      {props
        .filter(([key, value]) => !isObject(value))
        .map(([name, value]) => (
          <PropsEditorItem
            key={name}
            name={name}
            value={value}
            onRemove={() => onChange(removeField(name))}
            onCreate={(name, value) => onChange(setField(name, value))}
            onNameChange={newName => onChange(changeFieldName(name, newName))}
            onValueChange={newValue =>
              onChange(changeFieldValue(name, newValue))
            }
          />
        ))}
    </Fragment>
  );
}
