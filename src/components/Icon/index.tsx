import {
  library,
  IconDefinition,
  IconName
} from "@fortawesome/fontawesome-svg-core";
import {
  FontAwesomeIcon,
  Props as FAProps
} from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";
import { memoize, Dictionary, isEqual } from "underscore";
const fontAwesomeIcons = require("@same/icons/fa-icons");

export interface Props extends Omit<FAProps, "icon" | "rotation" | "size"> {
  icon: string;
  size: "xs" | "sm" | "lg";
  rotation?: number;
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

export default React.memo(function Icon(props: Props) {
  if (/^(s-).*$/.test(props.icon as string)) {
    const Component = require("../../icons/" + props.icon + ".svg").default;
    const size = { xs: 18, sm: 20, lg: 24 }[props.size || "xs"];
    let transform = "";
    transform += props.rotation ? `rotateZ(${props.rotation}deg) ` : "";
    transform += props.flip
      ? `rotate${props.flip === "horizontal" ? "Y" : "X"}(${180}deg)`
      : "";
    return useMemo(
      () => (
        <Component
          style={{ ...(transform && { transform }), ...props.style }}
          width={size}
          height={size}
        />
      ),
      [props.icon, transform]
    );
  } else {
    loadIcon(props.icon as string);
    return useMemo(
      () => <FontAwesomeIcon {...(props as any)} icon={["far", props.icon]} />,
      [props.icon]
    );
  }
});
