const { merge } = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const TARGET = process.env.TARGET

function createClientConfig() {
  return {
    optimization: {
      splitChunks: {
        name: 'manifest',
        minChunks: Infinity
      }
    },
    plugins: [new VueSSRClientPlugin()]
  }
}

function createServerConfig() {
  return {
    target: 'node',
    devtool: 'source-map',
    output: {
      libraryTarget: 'commonjs2'
    },
    externals: nodeExternals({
      allowlist: /\.css$/
    }),
    plugins: [new VueSSRServerPlugin()]
  }
}

module.exports = {
  outputDir: './dist/' + TARGET,
  css: {
    extract: false
  },
  configureWebpack: merge(
    { entry: `/src/entry-${TARGET}.js` },
    TARGET === 'client' ? createClientConfig() : createServerConfig()
  )
}
