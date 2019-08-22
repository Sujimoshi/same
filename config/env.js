const { parse } = require("dotenv");
const { readFileSync } = require("fs");
const { resolve } = require("path");

const environment = {
  ...process.env,
  ...parse(readFileSync(resolve(__dirname, "../.env")))
};

const parseValue = val => {
  try {
    const parsed = JSON.parse(val.toLowerCase());
    if (typeof parsed !== "string") return parsed;
    return val;
  } catch (err) {
    return val;
  }
};

module.exports = (key, def) => {
  const res = environment[key];
  if (res === undefined && def !== undefined) {
    return def;
  } else if (res === undefined && def === undefined) {
    throw new Error(`Environment variable '${key}' is not defined.`);
  } else {
    return parseValue(res);
  }
};
