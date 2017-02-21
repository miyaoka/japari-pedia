const storeKey = 'japari-pedia-key'

chrome.storage.onChanged.addListener(() => {
  location.reload()
})

export const enabler = (cb) => {
  chrome.storage.local.get(storeKey, (items) => {
    if (items[storeKey]) return
    cb()
  })
}

export default enabler
