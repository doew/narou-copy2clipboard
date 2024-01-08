try {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "copyText",
      title: "クリップボードに本文をコピー",
      contexts: ["all"]
    });
  });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "copyText") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: copyTextToClipboard
      });
    }
  });

  function copyTextToClipboard() {
    var text = document.getElementById('novel_honbun').innerText;
    navigator.clipboard.writeText(text).then(function() {
      console.log('クリップボードにコピーしました');
    }, function(err) {
      console.error('エラー: ', err);
    });
  }
} catch (e) {
  console.error('エラー: ', e);
}
