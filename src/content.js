function copyTextToClipboard() {
  const container = document.getElementById('novel_honbun');
  let text = '';

  const processNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === 'RUBY') {
        node.querySelectorAll('rt').forEach(rt => {
          text += rt.textContent;
        });
      } else {
        text += node.textContent;
      }
    }
  };

  container.querySelectorAll('p').forEach(p => {
    p.childNodes.forEach(processNode);
  });

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
