require("ts-node").register({
  ignore: [/node_modules\/(?!react-dnd|dnd-core)/]
});
// require("@babel/register")({
//   extensions: [".jsx", ".js", ".ts", ".tsx"],
//   cache: true
// });
require("module-alias/register");

var Module = require("module");
(function(_require) {
  Module.prototype.require = function() {
    const res = _require.apply(this, arguments);
    res.default = res.default || res;
    return res;
  };
})(Module.prototype.require);

require("../src/index.entry.tsx");
