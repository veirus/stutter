var browser = require('webextension-polyfill')

function onContextClick (info) {
  let q = browser.tabs.query({
    'active': true,
    'currentWindow': true
  })
  q.then(tabs => {
    browser.tabs.sendMessage(tabs[0].id, {
      'functiontoInvoke': 'stutterSelectedText',
      'selectedText': info.selectionText
    })
  })
}

// Context menu "Stutter Selection" option
browser.contextMenus.create({
  'title': 'Stutter Selection',
  'contexts': ['selection'],
  'onclick': onContextClick
})

function onIconClick () {
  let q = browser.tabs.query({
    'active': true,
    'currentWindow': true
  })
  q.then(tabs => {
    browser.tabs.sendMessage(tabs[0].id, {
      'functiontoInvoke': 'stutterFullPage'
    })
  })
}

function onMessage (request) {
  switch (request.functiontoInvoke) {
    case 'openSettings':
      browser.runtime.openOptionsPage()
      break
  }
}

// Handle clicking on the browser icon
browser.browserAction.onClicked.addListener(onIconClick)
browser.runtime.onMessage.addListener(onMessage)
