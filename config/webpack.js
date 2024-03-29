const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, args) => {
  const CWD = process.env.PWD;
  const environment = args.mode || "development";

  const config = {};
  config.module = {};
  config.module.rules = [];
  config.plugins = [];

  config.mode = environment;
  config.stats = "minimal";
  config.target = "electron-renderer";
  config.devtool = "inline-source-map";
  config.entry = path.join(CWD, "src", "index.entry.tsx");

  config.devServer = {
    stats: "minimal"
  };

  config.output = {
    filename: "[name].entry.js",
    path: path.resolve(CWD, "dist"),
    libraryTarget: "umd"
  };

  config.module.rules.push({
    test: /\.(j|t)sx?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-react",
          "@babel/preset-typescript"
        ]
      }
    }
  });

  config.module.rules.push({
    test: /\.(png|jpg|gif)$/i,
    use: ["url-loader"]
  });

  config.module.rules.push({
    test: /\.(svg)$/,
    loader: "react-svg-loader",
    options: {
      svgo: {
        plugins: [{ removeViewBox: false }]
      }
    }
  });

  config.resolve = {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      "@same": path.join(CWD, "src")
    }
  };

  config.plugins.push(new HtmlWebpackPlugin());

  return config;
};
