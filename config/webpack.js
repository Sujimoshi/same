const path = require("path");
const entry = require("webpack-glob-entry");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (_, args) => {
  const CWD = process.env.PWD;
  const environment = args.mode || "development";

  const config = {};
  config.module = {};
  config.module.rules = [];
  config.plugins = [];

  config.mode = environment;
  config.target = "electron-renderer";
  config.stats = "minimal";
  config.devtool = "inline-source-map";
  config.entry = entry(path.resolve(CWD, "src/*.entry.{js,ts,jsx,tsx}"));

  config.devServer = {
    stats: "minimal"
  };

  config.output = {
    filename: "[name].entry.js",
    path: path.resolve(CWD, "dist"),
    libraryTarget: "umd"
  };

  config.module.rules.push({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: "ts-loader"
  });

  config.resolve = {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@same": path.resolve(__dirname, "../src")
    }
  };

  config.plugins.push(new HtmlWebpackPlugin());

  return config;
};
