import webpack from 'webpack'
import path from 'path'
import WriteFilePlugin from 'write-file-webpack-plugin'
import env from './env'

const chromeExtPath = path.join(__dirname, '../src', 'chrome_extension')

module.exports = {
  entry: {
    content: path.join(chromeExtPath, 'content'),
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
  ],
}
