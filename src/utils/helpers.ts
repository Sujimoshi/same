export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const traverse = <N>(
  tree: N,
  iterator: (node: N, parent: N, index: number, level: number) => any,
  childrensKey: string = "children"
) => {
  return (function next(
    node: N,
    parent: N = null,
    index: number = 0,
    level: number = 0
  ) {
    if (iterator(node, parent, index, level)) return;
    if ((node as any)[childrensKey]) {
      (node as any)[childrensKey].map((el: N, i: number) =>
        next(el, node, i, level + 1)
      );
    }
  })(tree);
};

export const eventValue = (cb: (value: any) => void) => (e: any) => {
  cb(e.target.value);
};
