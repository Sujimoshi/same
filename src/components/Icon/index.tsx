import { library } from "@fortawesome/fontawesome-svg-core";
import * as icons from "@fortawesome/free-solid-svg-icons";
import { camel } from "change-case";
import { FontAwesomeIcon, Props } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Icon(props: Props) {
  const name = camel("fa-" + props.icon);
  const icon = (icons as any)[name];
  icon && library.add(icon);
  return <FontAwesomeIcon {...props} />;
}
