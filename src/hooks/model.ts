import { useState } from "react";
import { eventValue } from "@same/utils/helpers";
import { Dictionary } from "underscore";

export const useModel = (obj: Dictionary<any>, key: string) => {
  const [state, setState] = useState(obj[key]);
  return {
    onChange: eventValue(val => {
      setState(val);
      obj[key] = val;
    }),
    value: state
  };
};
