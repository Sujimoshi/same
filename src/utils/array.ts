import { without } from "underscore";

export const after = <T>(current: T) => (arr: T[]): number =>
  arr.findIndex(el => el === current) + 1;

export const insertItem = <T>(item: T, getIndex: (arr: T[]) => number) => (
  arr: T[]
) => {
  if (getIndex) {
    const nextArr = [...arr];
    nextArr.splice(getIndex(nextArr), 0, item);
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
