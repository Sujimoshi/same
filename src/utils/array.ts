import { without, findWhere, find } from "underscore";

export const addItem = <T>(item: T, index?: number) => (arr: T[]) => {
  if (index) {
    const nextArr = [...arr];
    nextArr.splice(index, 0, item);
    return nextArr;
  } else {
    return [...arr, item];
  }
};

export const removeItems = <T>(
  iterator: (element: T, index: number) => boolean
) => (arr: T[]) => {
  return without(arr, ...arr.filter(iterator));
};

export const replaceItem = <T>(
  iterator: (element: T, index: number) => boolean,
  item: T
) => (arr: T[]) => {
  const nextArr = [...arr];
  const i = nextArr.findIndex(iterator);
  nextArr.splice(i, 1, item);
  return nextArr;
};
