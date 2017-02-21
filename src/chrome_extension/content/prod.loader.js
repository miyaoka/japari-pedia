import enabler from './enabler'

enabler(() => {
  /* eslint-disable global-require */
  require('./content').default()
  /* eslint-enable global-require */
})
