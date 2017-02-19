import fs from 'fs-extra'
import path from 'path'
import manifest from '../src/chrome_extension/manifest.json'

fs.emptyDirSync(path.join(__dirname, '../build'))

module.exports = (isDev) => {
  Object.assign(manifest, {
    description: process.env.npm_package_description,
    version: process.env.npm_package_version,
  })

  if (isDev) {
    manifest.content_scripts[0].js = ['content_loader.js']
  }

  fs.writeFileSync(
  path.join(__dirname, '../build/manifest.json'),
    JSON.stringify(manifest),
  )
}
