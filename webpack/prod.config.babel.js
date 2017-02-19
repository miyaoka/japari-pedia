import UglifyJSPlugin from 'uglifyjs-webpack-plugin'
import webpackMerge from 'webpack-merge'
import commonConf from './common.config'
import manifest from './generate_manifest'

manifest()

const prodConf = {
  plugins: [
    new UglifyJSPlugin(),
  ],
}

const config = webpackMerge(commonConf, prodConf)

module.exports = config
