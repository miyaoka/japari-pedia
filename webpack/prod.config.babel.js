import path from 'path'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'
import webpackMerge from 'webpack-merge'
import commonConf from './common.config'
import manifest from './generate_manifest'

manifest()

const prodConf = {
  entry: {
    content: path.join(__dirname, '../src', 'chrome_extension', 'content', 'prod.loader'),
  },
  plugins: [
    new UglifyJSPlugin(),
  ],
}

const config = webpackMerge(commonConf, prodConf)

module.exports = config
