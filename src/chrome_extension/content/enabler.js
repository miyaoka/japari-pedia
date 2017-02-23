import * as storeKey from '../storekey'

chrome.storage.onChanged.addListener(() => {
  location.reload()
})

export default (cb) => {
  chrome.storage.local.get(storeKey.isDisableContent, (items) => {
    if (items[storeKey.isDisableContent]) return
    cb()
  })
}
