import React, { ReactNode } from "react";
import useDropdown from "@same/hooks/dropdown";
import { DropdownWrapper, DropdownButtonWrapper } from "@same/styled/Dropdown";
import { Panel } from "@same/styled/Panel";
import { Text } from "@same/styled/Typography";
import ListItem from "../ListItem";
import { Button } from "@same/styled/Button";
import Icon from "../Icon";

export interface Option {
  label: string;
  value: any;
}

export interface Props {
  options: Option[];
  value: any;
  button: ReactNode;
  onChange: (value: Option) => void;
  renderItem?: (options: Option) => ReactNode;
}

export default function DropSelect({
  button,
  options,
  value,
  onChange,
  renderItem
}: Props) {
  const [expanded, toggle, ref] = useDropdown();

  return (
    <DropdownWrapper ref={ref} onClick={() => toggle()}>
      {button}
      {expanded && (
        <Panel absolute>
          {options.map(el => (
            <ListItem
              focus={el.value === value}
              key={el.label}
              onClick={() => {
                onChange(el);
                toggle(false);
              }}
            >
              {renderItem ? renderItem(el) : el.label}
            </ListItem>
          ))}
        </Panel>
      )}
    </DropdownWrapper>
  );
}
