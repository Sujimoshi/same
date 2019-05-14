const path = require('path')
const entry = require('webpack-glob-entry')
const env = require('./env')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (_, args) => {
  const CWD = env('PWD')
  const environment = args.mode || 'development'
  const isServer = process.argv[1].includes('webpack-dev-server')

  const config = {}
  config.module = {}
  config.module.rules = []
  config.plugins = []

  config.mode = environment
  config.target = 'node'
  config.stats = 'minimal'
  config.devtool = 'inline-source-map'
  config.entry = entry(path.resolve(CWD, 'src/*.entry.{js,ts,jsx,tsx}'))

  config.devServer = {
    stats: 'minimal'
  }

  config.output = {
    filename: '[name].entry.js',
    path: path.resolve(CWD, 'dist'),
    libraryTarget: 'umd'
  }

  config.module.rules.push({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: 'ts-loader'
  })

  config.resolve = {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      '@same': path.resolve(__dirname, '../src')
    }
  }

  if (isServer) {
    config.plugins.push(new HtmlWebpackPlugin())
  }

  return config
}
