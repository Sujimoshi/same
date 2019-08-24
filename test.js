const { join } = require("path");

console.log(
  "/Some/Any/Folder"
    .replace(/^\//, "")
    .split("/")
    .reduce((tmp, el, i) => {
      const prev = tmp[i - 1];
      tmp.push(prev ? join("/", prev, el) : join("/", el));
      return tmp;
    }, [])
);
