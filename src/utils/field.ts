import { Dictionary } from "underscore";
import { compose } from "redux";

export const setField = <T>(name: string, value: any) => (dict: T): T => {
  return { ...dict, [name]: value };
};

export const removeField = (name: string) => (dict: Dictionary<any>) => {
  return Object.entries(dict).reduce(
    (object, [key, value]) => {
      if (key !== name) {
        object[key] = value;
      }
      return object;
    },
    {} as Dictionary<any>
  );
};

export const changeFieldName = (name: string, newName: string) => (
  dict: Dictionary<any>
) => {
  if (name === newName) return { ...dict };
  return compose(
    setField(newName, dict[name]),
    removeField(name)
  )(dict);
};

export const changeFieldValue = (name: string, newValue: any) => (
  dict: Dictionary<any>
) => {
  if (dict[name] === newValue) return { ...dict };
  return { ...dict, [name]: newValue };
};
