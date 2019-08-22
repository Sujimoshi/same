import React, { ReactNode } from "react";
import EditorRow from "../EditorRow";
import DropSelect from "@same/components/DropSelect";
import Button from "@same/components/Button";
import { findValue } from "@same/utils/helpers";
import { Text } from "@same/styled/Typography";

export interface Props {
  value: string;
  onChange: (value: string) => any;
}

const fontsList = [
  { label: "Inherit", value: "" },
  { label: "Arial", value: "Arial, Helvetica, sans-serif" },
  { label: "Arial Black", value: '"Arial Black", Gadget, sans-serif' },
  { label: "Comic Sans MS", value: '"Comic Sans MS", cursive, sans-serif' },
  { label: "Courier New", value: '"Courier New", Courier, monospace' },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Impact", value: "Impact, Charcoal, sans-serif" },
  {
    label: "Lucida Sans Unicode",
    value: '"Lucida Sans Unicode", "Lucida Grande", sans-serif'
  },
  { label: "Lucida Console", value: '"Lucida Console", Monaco, monospace' },
  {
    label: "Palatino Linotype",
    value: '"Palatino Linotype", "Book Antiqua", Palatino, serif'
  },
  { label: "Times New Roman", value: '"Times New Roman", Times, serif' },
  { label: "Tahoma", value: "Tahoma, Geneva, sans-serif" },
  { label: "Trebuchet MS", value: '"Trebuchet MS", Helvetica, sans-serif' },
  { label: "Verdana", value: "Verdana, Geneva, sans-serif" }
];

export default function FontSelector({ onChange, value }: Props) {
  return (
    <EditorRow field="fontFamily" title="Font">
      <DropSelect
        button={
          <Button appendIcon="caret-down">
            {findValue(fontsList, "label", value) || "Inherit"}
          </Button>
        }
        renderItem={option => (
          <Text styled={{ fontFamily: option.value }} row>
            {option.label}
          </Text>
        )}
        options={fontsList}
        onChange={option => onChange(option.value)}
        value={value}
      />
    </EditorRow>
  );
}