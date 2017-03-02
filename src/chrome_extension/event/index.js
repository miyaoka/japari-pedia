import * as storeKey from '../storekey'

let isDisableContent = false

const updateIcon = () => {
  chrome.browserAction.setIcon({
    path: `icon/38${isDisableContent ? 'off' : ''}.png`,
  })
}

const getIsDisableContentState = () => {
  chrome.storage.local.get(storeKey.isDisableContent, (items) => {
    isDisableContent = items[storeKey.isDisableContent]
    updateIcon()
  })
}
const setIsDisableContentState = () => {
  chrome.storage.local.set({
    [storeKey.isDisableContent]: isDisableContent,
  })
}

const invalidateHumanSitelinks = () => {
  chrome.storage.local.set({
    [storeKey.humanSitelinksValid]: false,
  })
}

const toggleContentEnable = () => {
  isDisableContent = !isDisableContent
  updateIcon()
  invalidateHumanSitelinks()
  setIsDisableContentState()
}

chrome.browserAction.onClicked.addListener(toggleContentEnable)

chrome.runtime.onStartup.addListener(invalidateHumanSitelinks)

getIsDisableContentState()
