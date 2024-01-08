chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copyText",
    title: "テキストをコピー",
    contexts: ["page"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copyText") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    }, () => {
      chrome.tabs.sendMessage(tab.id, { action: "copyText" });
    });
  }
});
