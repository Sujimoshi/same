import { Dictionary } from "underscore";
import { useState, useCallback } from "react";
import { eventValue } from "@same/utils/helpers";

export const useFormData = <T extends Dictionary<any>>(
  dictionary: T
): [T, any] => {
  const [state, setState] = useState(dictionary);

  const setField = (key: string) => (val: string) => {
    setState({
      ...state,
      [key]: val
    });
  };

  const useModel = (key: string) => ({
    value: state[key],
    onChange: (e: Event | string) =>
      typeof e === "string" ? setField(key)(e) : eventValue(setField(key))(e)
  });

  return [state, useModel];
};
