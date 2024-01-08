function copyTextToClipboard() {
  var text = document.getElementById('novel_honbun').innerText;
  navigator.clipboard.writeText(text).then(function() {
    console.log('クリップボードにコピーしました');
  }, function(err) {
    console.error('エラー: ', err);
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "copyText") {
    copyTextToClipboard();
  }
});

