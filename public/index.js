require("ts-node").register();
// require("module-alias/register");

var Module = require("module");
(function(_require) {
  Module.prototype.require = function() {
    const res = _require.apply(this, arguments);
    res.default = res.default || res;
    return res;
  };
})(Module.prototype.require);

require("../src/index.entry.tsx");
