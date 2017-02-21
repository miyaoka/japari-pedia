const storeKey = 'japari-pedia'

let isEnableContent = true

const updateIcon = () => {
  chrome.browserAction.setIcon({
    path: `icon/38${isEnableContent ? '' : 'off'}.png`,
  })
}

const getStorage = () => {
  chrome.storage.local.get(null, (items) => {
    isEnableContent = items[storeKey]
    updateIcon()
  })
}
const setStorage = () => {
  chrome.storage.local.set({
    [storeKey]: isEnableContent,
  })
}

const toggleContentEnable = () => {
  isEnableContent = !isEnableContent
  updateIcon()
  setStorage()
}

chrome.browserAction.onClicked.addListener(toggleContentEnable)

getStorage()
