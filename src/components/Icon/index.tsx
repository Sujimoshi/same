import {
  library,
  IconDefinition,
  IconName
} from "@fortawesome/fontawesome-svg-core";
import {
  FontAwesomeIcon,
  Props as FAProps
} from "@fortawesome/react-fontawesome";
import React from "react";
import { memoize } from "underscore";
import fontAwesomeIcons from "./faIcons";

export interface Props
  extends Omit<FAProps, "icon" | "rotation" | "size" | "flip"> {
  icon: string;
  size?: "xs" | "sm" | "lg";
  rotation?: number;
  flip?: "horizontal" | "vertical";
}

const loadIcon = memoize(
  (iconName: string): IconDefinition => {
    const result = {
      prefix: "far",
      iconName: iconName as IconName,
      icon: fontAwesomeIcons.styles.far[iconName]
    } as IconDefinition;
    if (!result.icon) throw new Error(`${result.icon} not found in fa library`);
    library.add(result);
    return result;
  }
);

export const rotateStyle = (deg?: string | number) =>
  deg ? `rotateZ(${deg}deg) ` : "";

export const flipStyle = (direction?: "horizontal" | "vertical" | "both") =>
  direction === "horizontal"
    ? `rotateY(180deg) `
    : direction === "vertical"
    ? `rotateX(180deg) `
    : "";

export const FAIcon = (props: Props) => {
  loadIcon(props.icon as string);
  return <FontAwesomeIcon {...(props as any)} icon={["far", props.icon]} />;
};

export const SameIcon = ({
  icon,
  size = "xs",
  rotation,
  flip,
  style
}: Props) => {
  const Component = require("../../icons/" + icon + ".svg").default;
  const sizeNum = { xs: 18, sm: 20, lg: 24 }[size];
  return (
    <Component
      style={{ transform: rotateStyle(rotation) + flipStyle(flip), ...style }}
      width={sizeNum}
      height={sizeNum}
    />
  );
};

export default React.memo(function Icon(props: Props) {
  if (/^(s-).*$/.test(props.icon)) {
    return <SameIcon {...props} />;
  } else {
    return <FAIcon {...props} />;
  }
});
