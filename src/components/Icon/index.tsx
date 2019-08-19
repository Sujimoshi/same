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
import { memoize, Dictionary } from "underscore";
const fontAwesomeIcons = require("@same/icons/fa-icons");

export interface Props extends Omit<FAProps, "icon" | "rotation"> {
  icon: string;
  rotation?: number;
}

const getIcon = memoize(
  (iconName: string): IconDefinition => {
    return {
      prefix: "far",
      iconName: iconName as IconName,
      icon: fontAwesomeIcons.styles.far[iconName]
    };
  }
);

const sizeMapping: Dictionary<number> = {
  xs: 18,
  sm: 20,
  lg: 24
};

export function Icon(props: Props) {
  if (/^(s-).*$/.test(props.icon as string)) {
    const Component = require("../../icons/" + props.icon + ".svg").default;
    const size = sizeMapping[props.size || "xs"];
    let transform = "";
    transform += props.rotation ? `rotateZ(${props.rotation}deg) ` : "";
    transform += props.flip
      ? `rotate${props.flip === "horizontal" ? "Y" : "X"}(${180}deg)`
      : "";
    return (
      <Component
        style={{ ...(transform && { transform }), ...props.style }}
        width={size}
        height={size}
      />
    );
  } else {
    const icon = getIcon(props.icon as string);
    if (!icon.icon) throw new Error(`${props.icon} not found in fa library`);
    library.add(icon);
    return <FontAwesomeIcon {...(props as any)} icon={["far", props.icon]} />;
  }
}

export default React.memo(Icon);
