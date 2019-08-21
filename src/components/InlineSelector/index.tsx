import React, { ReactNode } from "react";
import { Icon, Props as IconProps } from "../Icon";
import { BoxWrapper, BoxItem } from "@same/styled/Box";
import { Text } from "@same/styled/Typography";

export interface Option {
  render: (selected: boolean) => ReactNode;
  value: any;
  disabled?: boolean;
}

export interface Props {
  disabled?: boolean;
  options: Option[];
  value: any;
  onChange: (value: any) => void;
}

export const createIconOption = (value: any) => (
  iconProps?: IconProps
): Option => ({
  render: () => <Icon {...iconProps} />,
  value
});

export const createTextOption = (value: any) => (text: string) => ({
  render: () => <Text>{text}</Text>,
  value
});

export const mapValuesToIconOptions = (
  field: string,
  defaultProps?: Partial<IconProps>
) => (values: { value: string; props?: Partial<IconProps> }[]) =>
  values.map(({ value, props }) => ({
    value,
    render: () => (
      <Icon icon={`s-${field}-${value}`} {...defaultProps} {...props} />
    )
  }));

export default React.memo(function InlineSelector({
  disabled,
  onChange,
  options,
  value
}: Props) {
  return (
    <BoxWrapper>
      {options.map(option => (
        <BoxItem
          disabled={disabled || option.disabled}
          key={option.value}
          selected={option.value === value}
          onClick={() => !disabled && onChange(option.value)}
        >
          {option.render(option.value === value)}
        </BoxItem>
      ))}
    </BoxWrapper>
  );
});
