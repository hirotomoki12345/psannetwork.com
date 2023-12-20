// ウェブサイト全体を翻訳するスクリプト

(function() {
  var webAppUrl = 'https://script.google.com/macros/s/AKfycbxjMc7MapfqNjQIBcr0AvIRhBfdrQMuLCB1sOPK3LXJRtYCOmVgqw5cAqudhWVwB-9g/exec';
  var sourceLanguage = 'en';
  var targetLanguage = 'ja';

  // ページ内のすべてのテキストを取得
  var allTextNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  var textNodes = [];
  while (allTextNodes.nextNode()) {
    textNodes.push(allTextNodes.currentNode);
  }

  // 各テキストを翻訳
  textNodes.forEach(function(node) {
    var originalText = node.nodeValue.trim();
    if (originalText !== '') {
      fetch(`${webAppUrl}?text=${originalText}&source=${sourceLanguage}&target=${targetLanguage}`)
        .then(response => response.json())
        .then(result => {
          var translatedText = result.text;
          node.nodeValue = translatedText;
        })
        .catch(error => {
          console.error('翻訳エラー:', error);
        });
    }
  });
})();
