module.exports = {
  plugins: [
    /* eslint-disable global-require */
    require('postcss-smart-import')({ /* ...options */ }),
    require('precss')({ /* ...options */ }),
    require('autoprefixer')({
      browsers: ['last 2 versions'],
    }),
    /* eslint-enable global-require */
  ],
}
