import { Dictionary } from "underscore";
import { useState } from "react";
import { eventValue } from "@same/utils/helpers";

export const useFormData = <T extends Dictionary<any>>(
  dictionary: T
): [T, any] => {
  const [state, setState] = useState(dictionary);

  const useModel = (key: string) => ({
    value: state[key],
    onChange: eventValue((val: any) => {
      setState({
        ...state,
        [key]: val
      });
    })
  });

  return [state, useModel];
};
