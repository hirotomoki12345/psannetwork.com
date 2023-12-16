// iframe.js

self.addEventListener('install', event => {
  console.log('Service Worker installed');
});

self.addEventListener('activate', event => {
  console.log('Service Worker activated');
});

self.addEventListener('fetch', event => {
  // Handle fetch events if needed
});

// サービスワーカーからメッセージを受信
navigator.serviceWorker.addEventListener('message', event => {
  if (event.data && event.data.action === 'showIframe') {
    // 新しい div 要素を作成し、HTML文字列をそのまま追加
    var div = document.createElement('div');
    div.innerHTML = event.data.iframeHTML;

    // 作成した iframe を body 要素に追加
    document.body.appendChild(div.firstChild);
  }
});
