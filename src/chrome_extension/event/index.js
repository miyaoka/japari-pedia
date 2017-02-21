const storeKey = 'japari-pedia-key'

let isDisableContent = false

const updateIcon = () => {
  chrome.browserAction.setIcon({
    path: `icon/38${isDisableContent ? 'off' : ''}.png`,
  })
}

const getStorage = () => {
  chrome.storage.local.get(null, (items) => {
    isDisableContent = items[storeKey]
    updateIcon()
  })
}
const setStorage = () => {
  chrome.storage.local.set({
    [storeKey]: isDisableContent,
  })
}

const toggleContentEnable = () => {
  isDisableContent = !isDisableContent
  updateIcon()
  setStorage()
}

chrome.browserAction.onClicked.addListener(toggleContentEnable)

getStorage()
