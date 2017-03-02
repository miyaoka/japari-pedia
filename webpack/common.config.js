import webpack from 'webpack'
import path from 'path'
import WriteFilePlugin from 'write-file-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import env from './env'

const chromeExtPath = path.join(__dirname, '../src', 'chrome_extension')

module.exports = {
  entry: {
    event: path.join(chromeExtPath, 'event'),
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'es2015', { modules: false },
              ],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          'url-loader',
        ],
      },
      {
        test: /\.ya?ml$/,
        use: [
          'json-loader',
          'yaml-loader',
        ],
      },
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
  },
  plugins: [
    // expose and write the allowed env vars on the compiled bundle
    new webpack.DefinePlugin({ 'process.env': JSON.stringify(env) }),
    new WriteFilePlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(chromeExtPath, 'icon'),
        to: 'icon',
      },
    ]),
    new CopyWebpackPlugin([
      {
        from: path.join(chromeExtPath, '_locales'),
        to: '_locales',
      },
    ]),
  ],
}
